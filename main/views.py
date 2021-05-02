from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from oauth2client.service_account import ServiceAccountCredentials
import gspread, requests, json, csv

# Create your views here.
def index(request):
    """Index Page view"""

    return render(request,"build/index.html")

def oxygen_data(request):
    """Returns the oxygen data as JSON from the spreadsheet"""

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
    worksheet_list = client.open("Oxygen").worksheets()

    # To fetch the data from all worksheets in the Oxygen sheet
    # for spreadsheet in client.open("Oxygen"):
        # Get spreadsheet's worksheets
        # worksheets = spreadsheet.worksheets()
    print(len(worksheet_list))
    for ws in worksheet_list[0:len(worksheet_list)-2]:
        # Append the values of the worksheet to values
        data.extend(ws.get_all_records())

    #print(data[1]["Active"])
    # filtering active data out of the whole data
    for row in data:
        if row['Active'].lower().strip() == "active":
            filtered_data.append(row)
    return JsonResponse(filtered_data,safe=False)

def current_cases_data(request):
    """Returns the current cases count as per MOHFW"""

    data = json.loads(requests.get("https://www.mohfw.gov.in/data/datanew.json").text)
    return JsonResponse(data,safe=False)

def state_wise_case_history(request):
    response = requests.get("https://api.covid19india.org/csv/latest/state_wise_daily.csv",
                            verify=False).content.decode('utf-8')
    reader = csv.DictReader(response.split("\n"))
    data = {}
    data["confirmed"] = []
    data["recovered"] = []
    data["deceased"] = []
    for record in reader:
        data[record["Status"].lower()].append(dict(record))
    return JsonResponse(data, safe=False)

    
def hospital_beds_data(request):
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
    worksheet_list = client.open("Hospital Beds").worksheets()

    # To fetch the data from all worksheets in the Oxygen sheet
    # for spreadsheet in client.open("Oxygen"):
    # Get spreadsheet's worksheets
    # worksheets = spreadsheet.worksheets()
    print(len(worksheet_list))
    for ws in worksheet_list[0:len(worksheet_list) - 2]:
        # Append the values of the worksheet to values
        data.extend(ws.get_all_records())

    # print(data[1]["Active"])
    # filtering active data out of the whole data
    for row in data:
        if row['Active'].lower().strip() == "active":
            filtered_data.append(row)
    return JsonResponse(filtered_data, safe=False)
