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
- Start the Server using below command
     ```sh
    python manage.py runserver
    ```

## APIs

| EndPoint      | Source | Description | Status |
| ----------- | ----------- |----------- |----------- |
| /api/oxygenStats      | GoogleSheet - Oxygen       | Provides the oxygen availability details|:heavy_check_mark:|
| /api/caseStats   | MOHFW website        | Current Cases count in India|:heavy_check_mark:|


## Development

Want to contribute? Great!

Make the changes and raise a PR. We will review it and then merge it




## License

MIT

**Free Software, Hell Yeah!**
