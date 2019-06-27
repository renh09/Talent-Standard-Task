## Talent Standard Task Code Repository
ReactJs, C# Web Api, MongoDb is used in Talent project. 

### Modified parts in Talent profile page

  * LinkedIn url & GitHub url
  * Description
  * User Details Component
  * Address
  * Nationality
  * Languages
  * Skills
  * Work experience
  * Visa status
  * Job seeking status
  * Photo upload


  * Front-end
    * Add ajax calls to retrieve data from the controllers
  * Back-end 
    * Build action methods in controllers and in services to fetch data from the database


## Guides to get started

**Note : Make sure that you have Visual Studio 2017 installed in your computer.
Visual Studio 2015 does not work with ReactJS**


### Launch Talent project
[Check the wiki](http://git.mvp.studio/talent-competition/talent-competition/wikis/guides/Starting-the-project) for more details.
* Get the latest source via Source Control Explorer
* Run webpack:
`cd C:\Talent\Talent\App\Talent.App.WebApp\wwwroot\js\react`
`npm run build`
* Launch Talent.WebApp project in Visual Studio. Register an account using your email address and log in.

### Project Structure  
[Check the wiki](http://git.mvp.studio/talent-competition/talent-competition/wikis/guides/project-structure) for more details.
 - Web Application:
    - `Talent.WebApp` : All frontend files are located here
 - Microservices:
    - `Talent.Services.Identity` : backend functions related to Login/Logout
    - `Talent.Services.Profile` : backend functions related to Profile
    - `Talent.Services.Talent` : backend functions related to Talent Matching, Jobs

### React tips
* Common coding mistakes using jsx
* Class names: class (html) => className (jsx), tabindex (html) => tabIndex (jsx)
* Require closing parent element or fragments: https://reactjs.org/docs/fragments.html
* Jsx Closing tags differ from html tags, you must have a closing tag for images and inputs: `<img></img>, <input</input>`
* Forgetting to turn on webpack : `npm run build`
* Forgetting to clear the cache


