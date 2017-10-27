# FCC API Basejump: URL Shortner Microservice
### User Stories
> 1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
> 2. If I pass an invalid URL that doesn't follow the valid `http://www.example.com` format, the JSON response will contain an error instead.
> 3. When I visit that shortened URL, it will redirect me to my original link.

### Example Creation Usage
`https://shorturl-hemakshis.herokuapp.com/new/https://www.facebook.com`
`https://shorturl-hemakshis.herokuapp.com/new/https://www.gmail.com`

### Example Creation Output
`{"originalURL": https://www.facebook.com, "shortURL": "https://shorturl-hemakshis.herokuapp.com/4692"}`
`{"originalURL": https://www.gmail.com, "shortURL": "https://shorturl-hemakshis.herokuapp.com/6015"}`

### Example Usage
`https://shorturl-hemakshis.herokuapp.com/9889`

### Will Redirect To
`https://www.google.com`
