*********API*********

GET: Categories
Endpoint: https://openapi.programming-hero.com/api/phero-tube/categories

GET: Videos
Endpoint: https://openapi.programming-hero.com/api/phero-tube/videos

GET: Video based on Category [ params ]
Endpoint : https://openapi.programming-hero.com/api/phero-tube/category/categoryId
Example: https://openapi.programming-hero.com/api/phero-tube/category/1001

GET: Video based on Title [ Query ]
Endpoint : https://openapi.programming-hero.com/api/phero-tube/videos?title=videoTitle
Example: https://openapi.programming-hero.com/api/phero-tube/videos?title=shape

GET: Video Details by video_id [ Query ]
Endpoint : https://openapi.programming-hero.com/api/phero-tube/video/video_id
Example: https://openapi.programming-hero.com/api/phero-tube/video/aaac


### Create a responsive Navbar which have following elements

- Logo of PH-Tube at Left
- A Search Box with Search Button at Center
- A Sort Button at the Right
- (Add a border at bottom of the Navbar)

### Create Dynamic Category Section

- Load all the Category Button From API and Show them in a centered position
- on click on a certain button, Load specific Category Data
- Integrate active button functionality for better UX

### Create Dynamic Video Sections

- Load all the videos from API
- use the Card Layout mentioned in Design part
- Show Video Duration (if have)
- Show Verified badge (if Verified)
- on click Show Video Details with Author info in a modal
- Show No Video Icon if specific category have no videos

## Additional Features

### Search Functionality

- Integrate search functionality
- on click Search button show Videos from all videos and de-activate active button on category

### Sort Functionality

- Sort Loaded Videos based on views
- on click Sort by View Button Sort Loaded videos by views in DESC order
