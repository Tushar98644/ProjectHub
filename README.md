# Welcome to Project HUB

A comprehensive platform that integrates various ai-powered tools and useful websites. It is a one-stop hub for resources such as language translator ,an image generator etc .Whether users have developed a new AI authentication, tool, a useful website, or enhancing any other digital project, application users can submit for approval . Once approved by the admin , the project will be added to the project section providig a platform for sharing their work with the community.

## Live demo

The site is deployed through Vercel, which you can view from [here](https://project-hub-olive.vercel.app/) <br>

## 🚀 Main Features
* ChatBot
* 3D Animations
* Approval System
* Role-based Authentication
* Custom Loader
* Real-time Notifications
* Real-Time data updates

## 📃Pages
* Homepage
* Add project page
* Contact page
* Admin page (accessible only to admin)
* Message page (admin only)
* 404 Error page

## 💻 Tech Stack

* Nextjs
* Typescript
* NextAuth
* Tailwindcss
* MongoDB
* Docker
* Jest

## 🤝 Credits
3D Animation : [LottieFiles](https://lottiefiles.com/animation/3d)
ChatBot Model : [OpenAI Api](https://platform.openai.com/account/usage)

## Prerequisites

Required to install and run the software:

* pnpm

If you don't have pnpm installed, you can install it by following the below steps : 

### Using npm

```bash
npm install -g pnpm
```
### Using Homebrew
If you have the package manager installed, you can install pnpm using the following command:

```
brew install pnpm
````
### Using winget
If you have winget installed, you can install pnpm using the following command:

```
winget install pnpm
```

### Using Scoop
If you have Scoop installed, you can install pnpm using the following command:

```
scoop install nodejs-lts pnpm
```

### Using Choco
If you have Chocolatey installed, you can install pnpm using the following command:

```
choco install pnpm
```

Alternatively you can delete the pnpm-lock.yaml file and install the dependencies with either ``yarn`` or ``npm`` <br>

This is a Next.js project bootstrapped with create-next-app

## 🌟 Getting Started

create a .env file and paste the follwing content in there : 

```
GITHUB_ID=""
GITHUB_SECRET=""
GOOGLE_ID=""
GOOGLE_SECRET=""
SECRET=""
MONGODB_URI=""
NEXT_PUBLIC_ADMIN_EMAIL=""
OPENAI_API_KEY=""
```
Now, create your own credentials for the providers , OpenAI api and MongoDB cluster and place them in the corresponding fields ,put the email in the `NEXT_PUBLIC_ADMIN_EMAIL` field which you want to give admin privileges

From the project folder, run these commands in the console (terminal) to install dependencies and run the app:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# 🖼️ Some glimpse of the site

### Login Page 

<img width="1440" alt="Screenshot 2023-07-16 at 7 17 10 PM" src="https://github.com/Tushar98644/ProjectHub/assets/107763774/1faa0b9a-afca-443e-815c-ddfa35154121">

### Home Page

<img width="1440" alt="Screenshot 2023-07-18 at 4 20 58 PM" src="https://github.com/Tushar98644/ProjectHub/assets/107763774/a3f5981b-19eb-4660-898d-7272ae765eed">

### Add Project Page

<img width="1440" alt="Screenshot 2023-07-18 at 4 22 20 PM" src="https://github.com/Tushar98644/ProjectHub/assets/107763774/ff56fcb2-ad88-40b3-8efb-fb7893d92ef9">

### Contact Page 

<img width="1440" alt="Screenshot 2023-07-17 at 1 26 30 PM" src="https://github.com/Tushar98644/ProjectHub/assets/107763774/6f0e3812-ebd0-4dd0-88d6-defecf30a045">

### Admin Page

<img width="1440" alt="Screenshot 2023-07-16 at 7 24 40 PM" src="https://github.com/Tushar98644/ProjectHub/assets/107763774/da4e7314-36db-492a-9307-c98a1825229f">

### Message Page

<img width="1440" alt="Screenshot 2023-07-18 at 4 24 31 PM" src="https://github.com/Tushar98644/ProjectHub/assets/107763774/d55d9dfd-ff1e-4441-ae6c-bf5fd9061f45">

### 404 Page

<img width="1440" alt="Screenshot 2023-07-18 at 4 23 17 PM" src="https://github.com/Tushar98644/ProjectHub/assets/107763774/a1f34be6-863d-4cd3-b9ee-6f55f8a298e2">

## ChatBot 

<img width="1438" alt="Screenshot 2023-07-18 at 4 19 33 PM" src="https://github.com/Tushar98644/ProjectHub/assets/107763774/824f2b33-6d13-489f-a57d-e07d6f2c7939">

## 🐛 Bug Reporting
Feel free to open an [issue](https://github.com/Tushar98644/ProjectHub/issues/new?assignees=&labels=bug&projects=&template=bug_report.yaml&title=%5BBUG%5D+%3Ctitle%3E) on GitHub if you find any bug.

## ⭐ Feature Request
Feel free to Open an [issue](https://github.com/Tushar98644/ProjectHub/issues/new/choose) on GitHub to request any additional features you might need for your use case.

## 🤝 Contributing to the Project
If you wish to contribute to the project, we advise checking out the [CONTRIBUTING.md](https://github.com/Tushar98644/ProjectHub/blob/main/CONTRIBUTING.md) file as a starting point. We expect that you adhere to the guidelines mentioned in the CONTRIBUTING.md and [CODE_OF_CONDUCT.md](https://github.com/Tushar98644/ProjectHub/blob/main/CODE_OF_CONDUCT.md).

## 📜 License
This software is open-source, licensed under the [MIT License](https://github.com/Tushar98644/ProjectHub/blob/main/LICENSE).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
