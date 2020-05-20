# Instagram API Setup

You can't run this because I have the secret. However you can follow these steps to create your own credentials

[https://developers.facebook.com/docs/instagram-basic-display-api/getting-started#valid-oauth-redirect-uris](https://developers.facebook.com/docs/instagram-basic-display-api/getting-started#valid-oauth-redirect-uris)

Its quite an awkward API to work with because it will not run on localhost. Here are some things I discovered:

* You have to provide a `redirect_uri` that is served over https (use heroku)
* You can't use <u>"insta"</u> or <u>"gram"</u> in the `redirect_uri`
* Facebook engineers seem to love training `/` slashes on their uris so you have to use them too on your `redirect_uri`
* Once you have your <u>"code"</u> when you make your POST request to swap your code for an access_token the payload has to be `application/x-www-form-urlencoded` so notice in my code I use `URLSearchParams` to build my payload up in that format.

## Beginner tips

To set `process.env.INSTAGRAM_SECRET` to your INSTAGRAM_SECRET add the following line to either `.bashrc` or `.zshrc` (replace the value in this key value pair with your secret). Remember to save then run `source ~/.zshrc` to load the change in your current shell. Or close your shell and open it up again.

```
export INSTAGRAM_SECRET=flaw83yhfwyourewsecret89yfop9uefo9supfa9up9
```

## Sequence diagram

![Sequence diagram](https://user-images.githubusercontent.com/4499581/82461431-59d1cf80-9ab2-11ea-9df9-d1d8fa67f745.png)
