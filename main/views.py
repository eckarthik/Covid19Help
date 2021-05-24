from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .helper_functions import api_data_fetcher,write_oxygendata_to_db,check_and_update_db,fetch_time_difference,tweet_id_fetcher
from .models import OxygenData
import datetime,requests,csv
from utils.hospital_beds_sources import HOSPITAL_BEDS_SOURCES
from utils.plasma_website_sources import PLASMA_DETAILS
from utils.cities_list import INDIAN_CITIES,TOP_INDIAN_CITIES
import urllib


# Create your views here.
def index(request):
    """Index Page view"""

    return render(request,"build/index.html")


def oxygen_data(request):
    """Returns the oxygen data as JSON from the spreadsheet"""
    # data = OxygenData.objects.all().values()
    # data = OxygenData.objects.filter(id=1).values()
    diff = fetch_time_difference()
    # data = []
    api_data = []
    data = api_data_fetcher("Oxygen")

    if not(OxygenData.objects.filter(id=1).exists()):
        write_oxygendata_to_db(data)
        db_data = list(OxygenData.objects.values())

    elif diff >= 15:
        check_and_update_db(api_data=data)
        db_data = list(OxygenData.objects.values())
    else:
        db_data = list(OxygenData.objects.values())

    return JsonResponse(db_data, safe=False)


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
    data = api_data_fetcher("Hospital Beds")
    return JsonResponse(data, safe=False)


def icu_data(request):
    data = api_data_fetcher("ICU", index_start=1)
    return JsonResponse(data, safe=False)


def hospital_beds_sources(request):
    return JsonResponse(HOSPITAL_BEDS_SOURCES, safe=False)


def plasma_sources(request):
    return JsonResponse(PLASMA_DETAILS, safe=False)


def fetch_tweets(request):
    location = request.GET.get("location")
    requirement = urllib.parse.unquote(request.GET.get("requirement"))
    requirement = requirement.replace(" ", "")

    print(location,requirement)

    id_list = tweet_id_fetcher([location, requirement])
    id_list = list(map(lambda id:str(id),id_list))
    return JsonResponse(id_list, safe=False)

def city_suggestions(request):
    """Returns the city suggestions for the given text"""

    input_text = request.GET.get("search") or None
    suggestions = []

    if input_text is None:
        for city in TOP_INDIAN_CITIES:
            suggestions.append(city)
    else:
        for city in INDIAN_CITIES:
            if str(city["city"]).lower().startswith(input_text.lower()):
                suggestions.append(city)

    return JsonResponse(suggestions,safe=False)
