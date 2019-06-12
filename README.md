# softButWhatWordCount
Get a count of a given word across all Shakespeare works.

## Developing

### Set Up Google Cloud Credentials

* Download the application credentials JSON from Caleb.
* Set the environment variable `GOOGLE_APPLICATION_CREDENTIALS` to the file path
of the JSON file that contains your service account key. This variable only
applies to your current shell session, so if you open a new session, set the
variable again.

```
export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
```

For example:

```
export GOOGLE_APPLICATION_CREDENTIALS="/home/caleb/Documents/personal/softButWhatWordCount/keys.json"
```
