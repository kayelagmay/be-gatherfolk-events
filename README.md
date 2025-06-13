Link to hosted platform: [Gatherfolk Events Platform](https://fe-gatherfolk-events.vercel.app/)

# GatherFolk Events Platform
A community events platform where members can browse events, sign up, and add them to their Calendar.
Staff members can log in to create, edit and delete events.

## Features

✅ Browse events  
✅ Sign up for events  
✅ Add events to Calendar  
✅ Staff login and dashboard  
✅ Staff can add/manage events  
✅ Responsive and accessible design

## Test Account

**Staff Login**:  
- Username: `staff@gatherfolkevents.com`  
- Password: `Password123!`  

**User Login**:  
- Not implemented in MVP — User signs up via event cards.  

## Local Setup Instructions
Prerequisites:

Node.js >= v22.x
npm >= v10.x

### 1️. Clone the repositories

`git clone https://github.com/kayelagmay/fe-gatherfolk-events`
`git clone https://github.com/kayelagmay/be-gatherfolk-events`

Don't forget to change into the correct directory!

### 2. Configure Environment Variables
In each repo, copy the example **.env.example** file: <br>
`cp .env.example .env` <br>
and fill in your values

### 3. Install Dependencies
Run the following command to install project dependencies:

`npm install`

### 4. Start the Development Server
Run the following command to start the development server:

`npm run dev`

### 5. Test the App
- Open your browser at your local port link e.g. http://localhost:5173
- Browse events, sign up, and download your .ics
- In the Staff Dashboard create, edit, and delete events.

## Future Improvements
- Add user authentication
- Implement dark mode
- Introduce sorting and filtering options
- Payment platform integration: Implement payments via Stripe, Google Pay, etc.
- Confirmation emails: Automatically send confirmation emails to users who sign up for an event.
- Social media integration: Allow users to share events on social platforms.
- Cross-platform: Build both a website and a mobile app.
- Google/Social login: Allow users to sign up using their Google or social media accounts.

---

Link to front-end repo: [Frontend Repository](https://github.com/kayelagmay/fe-gatherfolk-events)