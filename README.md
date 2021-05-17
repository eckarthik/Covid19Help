# Covid19Help
##### _Aiming to help people find necessary things during this pandemic_
####
####
####
# Getting Started

- Clone the repository
- Create a Virtualenv, activate it and install the dependencies by running 
     ```sh
    pip3 install -r requirements.txt
    ```
- Start the django server using below command
     ```sh
    python manage.py runserver
    ```
 - Start the react server using below commands
    ```sh
    cd frontend
    npm init
    npm start
    ```
    _Run the `npm init` command only once at the initial stage_
 - Access the following URL in the browser for UI
    `http://localhost:3000/`
## APIs

| EndPoint      | Source | Description | Status |
| ----------- | ----------- |----------- |----------- |
| /api/oxygenStats      | GoogleSheet - Oxygen       | Provides the oxygen availability details|:heavy_check_mark:|
| /api/caseStats   | MOHFW website        | Current Cases count in India|:heavy_check_mark:|
| /api/stateWiseCaseHistory   | covid19india.org        | State wise Confirmed/Recovered/Deceased Cases count in India|:heavy_check_mark:|
| /api/hospitalbeds   | GoogleSheet- Hospital Beds        | Current Hospital Beds Availability|:heavy_check_mark:|
| api/hospitalBedsSources   | List of Government Website        | List of Official Government websites|:heavy_check_mark:|
| api/plasmasources   | List of websites        | List of Official Donor websites|:heavy_check_mark:|
| api/fetchTweets   | Twitter        | Tweets containing verified leads|:heavy_check_mark:|
| api/citySuggestions   | List of Indian Cities        | City Suggestions|:heavy_check_mark:|


## Development

Want to contribute? Great!

Make the changes and raise a PR. We will review it and then merge it




## License

MIT

**Free Software, Hell Yeah!**
