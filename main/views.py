from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from oauth2client.service_account import ServiceAccountCredentials
import gspread, requests, json

# Create your views here.
def index(request):
    """Index Page view"""

    return HttpResponse("<h1>Coming Soon</h1>")

def oxygen_data(request):
    """Returns the oxygen data as JSON from the spreadsheet"""

    credential = ServiceAccountCredentials.from_json_keyfile_name("credentials.json",
                                                                  ["https://spreadsheets.google.com/feeds",
                                                                   "https://www.googleapis.com/auth/spreadsheets",
                                                                   "https://www.googleapis.com/auth/drive.file",
                                                                   "https://www.googleapis.com/auth/drive"])
    client = gspread.authorize(credential)
    gsheet = client.open("Oxygen").sheet1
    return JsonResponse(gsheet.get_all_records(),safe=False)

def current_cases_data(request):
    """Returns the current cases count as per MOHFW"""

    data = json.loads(requests.get("https://www.mohfw.gov.in/data/datanew.json").text)
    return JsonResponse(data,safe=False)