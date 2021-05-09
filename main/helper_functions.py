from oauth2client.service_account import ServiceAccountCredentials
import gspread, requests, json, csv
from .models import OxygenData
import datetime
import tweepy as tw
from twitter_credentials import ACCESS_TOKEN, ACCESS_TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET


# Helper functions
def api_data_fetcher(google_sheet_name, index_start=0):
    credential = ServiceAccountCredentials.from_json_keyfile_name("credentials.json",
                                                                  ["https://spreadsheets.google.com/feeds",
                                                                   "https://www.googleapis.com/auth/spreadsheets",
                                                                   "https://www.googleapis.com/auth/drive.file",
                                                                   "https://www.googleapis.com/auth/drive"])
    client = gspread.authorize(credential)
    # gsheet = client.open("Oxygen").sheet1
    # data = gsheet.get_all_records()
    data = []
    filtered_data = []
    worksheet_list = client.open(google_sheet_name).worksheets()

    # To fetch the data from all worksheets in the Oxygen sheet
    # for spreadsheet in client.open("Oxygen"):
    # Get spreadsheet's worksheets
    # worksheets = spreadsheet.worksheets()
    print(len(worksheet_list))
    for ws in worksheet_list[index_start:len(worksheet_list)-1]:
        # Append the values of the worksheet to values
        data.extend(ws.get_all_records())

    # print(data[1]["Active"])
    # filtering active data out of the whole data
    for row in data:
        if row['Active'].lower().strip() == "active" or OxygenData.objects.filter(record_id=row["Id"]):
            filtered_data.append(row)
    return filtered_data


def check_and_update_db(api_data):
    # print(api_data[0:1])
    # print(db_data[0:1])
    for row in api_data:
        # print(row)
        if OxygenData.objects.filter(record_id=row["Id"]):
            db_record = OxygenData.objects.get(record_id=row["Id"])
            if (row['State/City'] == db_record.state_name and
                    row['Distributor Name'] == db_record.distributor_name and
                    row['Area'] == db_record.area and
                    row['Contact Information'] == db_record.contact_information):
                continue
            elif row['Active'].lower().strip() == "inactive":
                print(row['Active'].lower().strip())
                response = OxygenData.objects.filter(record_id=row["Id"]).delete()
                print(response)
            else:
                OxygenData.objects.filter(record_id=row["Id"])\
                    .update(state_name=row['State/City'],
                            distributor_name=row['Distributor Name'],
                            area=row['Area'],
                            contact_information=row["Contact Information"],
                            updated_at=datetime.datetime.now())
        else:
            print(row)
            write_oxygendata_to_db(row)

    OxygenData.objects.order_by("id")


def write_oxygendata_to_db(data):
    # print(data[1])
    print(type(data))

    if type(data) == dict:
        record = OxygenData()
        record.record_id = data["Id"]
        record.state_name = data['State/City']
        record.distributor_name = data['Distributor Name']
        record.area = data['Area']
        record.contact_information = data['Contact Information']
        record.save()
    else:
        for row in data:
            record = OxygenData()
            record.record_id = row["Id"]
            record.state_name = row['State/City']
            record.distributor_name = row['Distributor Name']
            record.area = row['Area']
            record.contact_information = row['Contact Information']
            record.save()


def fetch_time_difference():
    difference_in_minutes = 0
    if not (OxygenData.objects.filter(id=1).exists()):
        return difference_in_minutes
    else:
        db_datetime = list(OxygenData.objects.order_by("-updated_at").values("updated_at"))
        difference = datetime.datetime.now() - db_datetime[0]['updated_at']
        difference_in_minutes = difference.total_seconds()/60
        return difference_in_minutes


def tweet_id_fetcher(hashtags):
    auth = tw.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    api = tw.API(auth, wait_on_rate_limit=True)

    tweet_ids = []
    search_words = ["Available", "verified"]

    for i in hashtags:
        search_words.append(i)

    today = datetime.date.today()
    date_since = today - datetime.timedelta(days=2)

    tweets = tw.Cursor(api.search, q=search_words, lang="en", since=date_since).items(20)

    for tweet in tweets:
        tweet_ids.append(tweet.id)
        print(tweet.id)

    return tweet_ids
