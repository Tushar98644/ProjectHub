# Welcome to Project HUB

A comprehensive platform that integrates various ai-powered tools and useful websites. It is a one-stop hub for resources such as language translator ,an image generator etc .Whether users have developed a new AI authentication, tool, a useful website, or enhancing any other digital project, application users can submit for approval . Once approved by the admin , the project will be added to the project section providig a platform for sharing their work with the community.

## Live demo

The site is deployed through Vercel, which you can view from [here](https://project-hub-olive.vercel.app/) <br>

## 🚀 Main Features

-   ChatBot
-   3D Animations
-   Approval System
-   Role-based Authentication
-   Custom Loader
-   Discussion section
-   Search and voice-to-text
-   Real-time Notifications
-   Real-time data updates

## 📃Pages

-   Homepage
-   Add project page
-   Contact page
-   Dashboard(profile,Analytics and user projects)
-   Admin page (accessible only to admin)
-   Discussion page(for each project)
-   Message page (admin only)
-   404 Error page

## 💻 Tech Stack

-   Nextjs
-   Typescript
-   NextAuth
-   Tailwindcss
-   MongoDB
-   Docker
-   Jest

## 🤝 Credits

3D Animation : [LottieFiles](https://lottiefiles.com/animation/3d) <br>
ChatBot Model : [OpenAI Api](https://platform.openai.com/account/usage)

## Prerequisites

Required to install and run the software:

-   pnpm

If you don't have pnpm installed, you can install it by following the below steps :

### Using npm

```bash
npm install -g pnpm
```

### Using Homebrew

If you have the package manager installed, you can install pnpm using the following command:

```
brew install pnpm
```

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

Alternatively you can delete the pnpm-lock.yaml file and install the dependencies with either `yarn` or `npm` <br>

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
NEXTAUTH_URL=""
```

Now, create your own credentials for the providers , OpenAI api and MongoDB cluster and place them in the corresponding fields ,put the email in the `NEXT_PUBLIC_ADMIN_EMAIL` field which you want to give admin privileges

From the project folder, run these commands in the console (terminal) to install dependencies and run the app:

```bash
npm run dev -p 5000
# or
yarn dev -p 5000
# or
pnpm dev -p 5000
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

## 🐳 Run using Docker

The project can also be run using docker. To run the project using docker, run the following command in the terminal:

```bash
docker-compose up
```

This command will start all the containers listed in the docker-compose.yml file. There are two Dockerfile in the project. The command will build the Dockerfile.dev and start the server. The Dockerfile.dev file is used for development purposes. The Dockerfile file is used for production purposes.

To build the Dockerfile instead, run the following command in the terminal:

```bash
docker build . -f Dockerfile -t <image-name>
```

The above command will build the Dockerfile file and create an image. To run the image, run the following command in the terminal:

```bash
docker run -p 5000:5000 <image-id>
```

or you can simply change the image name in the docker-compose.yml file and run the following command in the terminal:

```bash
docker-compose up
```

`Note` : You need to have docker installed on your system. Also make sure to add the credentials in the .env file before running the above command. The above command will start the server on port 5000.You can change the default port by changing the `NEXTAUTH_URL` in the .env file.

# 🖼️ Some glimpse of the site

### Login Page

<img width="1440" alt="Screenshot 2025-05-17 at 11 53 10 PM" src="https://github.com/user-attachments/assets/48344c61-f5d7-4e90-b518-a61165304553" />

### View Projects Page

<img width="1440" alt="Screenshot 2025-05-17 at 11 54 55 PM" src="https://github.com/user-attachments/assets/56e16692-f848-408c-abac-8d96db4cbc4c" />

### Add Project Page

<img width="1439" alt="Screenshot 2025-05-17 at 11 55 36 PM" src="https://github.com/user-attachments/assets/7fda3997-dc4c-402a-a8a7-6df8b322fc45" />

### Contact Page

<img width="1440" alt="Screenshot 2025-05-17 at 11 56 22 PM" src="https://github.com/user-attachments/assets/4a1cc59d-ceb0-4723-ab3f-5e4a5b76da71" />

### Admin Page

<img width="1440" alt="Screenshot 2025-05-18 at 12 00 36 AM" src="https://github.com/user-attachments/assets/339c1696-b732-4f9f-926d-b7cbd7aa947d" />

### Discussion Page

<img width="1440" alt="Screenshot 2025-05-18 at 12 02 29 AM" src="https://github.com/user-attachments/assets/c8e175d5-8578-4012-b372-0f60934ba352" />

<img width="1440" alt="Screenshot 2025-05-18 at 12 08 18 AM" src="https://github.com/user-attachments/assets/a151ad94-752d-496a-afb9-db6342236b55" />

### Message Page

<img width="1436" alt="Screenshot 2025-05-18 at 12 03 30 AM" src="https://github.com/user-attachments/assets/4877ba6c-4b01-42d9-90a5-48f303b19968" />

### Dashboard Profile

<img width="1436" alt="Screenshot 2025-05-17 at 11 56 58 PM" src="https://github.com/user-attachments/assets/79f5c0cf-62cc-41af-bae0-cd31be8e566d" />

### My projects page  

<img width="1440" alt="Screenshot 2025-05-17 at 11 57 32 PM" src="https://github.com/user-attachments/assets/28dd624b-a980-4cad-95d7-04b96ef101dc" />

### 404 Page

<img width="1440" alt="Screenshot 2025-05-18 at 12 11 20 AM" src="https://github.com/user-attachments/assets/96052da3-d80a-46f4-84cd-6970e13f4360" />

## Star History

<a href="https://star-history.com/#Tushar98644/ProjectHub&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Tushar98644/ProjectHub&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Tushar98644/ProjectHub&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Tushar98644/ProjectHub&type=Date" />
  </picture>
</a>

## Activity
![Alt](https://repobeats.axiom.co/api/embed/c79d4b8da007a35d2bc3ab8239132c50e6f4fdfb.svg "Repobeats analytics image")

## Author

👤 **Tushar Banik**

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

## 🙏Support

Don't forget to leave a star ⭐️

## Thank You to Our Contributors❤️

<details><summary> <b>See Contributors</b> </summary>
<Link href="https://github.com/Tushar98644/ProjectHub/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Tushar98644/ProjectHub" />
<Link/>
</details>
