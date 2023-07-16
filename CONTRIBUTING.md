<h1 align="center"><b>Guidelines for Contribution</b></h1> 

## Contributing

Hi there! We're thrilled that you'd like to contribute to ProjectHub. Your help is essential for keeping it great.

By participating in this project you agree to abide by its terms.

## Issues and PRs

If you have suggestions for how this project could be improved, or want to report a bug, open an issue! We'd love all and any contributions. If you have questions, too, we'd love to hear them.

We'd also love PRs. If you're thinking of a large PR, we advise opening up an issue first to talk about it, though! Look at the links below if you're not sure how to open a PR.

<h2 align="center"><b>How to make a Pull Request?</b></h2>

**1.**  Fork [this](https://github.com/Tushar98644/ProjectHub.git) repository.

**2.**  Clone your forked copy of the project.

```
git clone https://github.com/<your_user_name>/ProjectHub.git .
```
<img width="1440" alt="Screenshot 2023-07-16 at 9 34 03 PM" src="https://github.com/Tushar98644/ProjectHub/assets/107763774/61731c10-bc74-460b-b635-704adb7ffe4d">

**3.** Check the remotes for this repository.

```
git remote -v
```

**4.** Always take a pull from the upstream repository to your master branch to keep it at par with the main project(updated repository).

```
git pull upstream main
```

**5.** Create a new branch.

```
git checkout -b <your_branch_name>
```

**6.** Perfom your desired changes to the code base.


**7.** Track your changes:heavy_check_mark: .

```
git add . 
```

**8.** Check for the changes .

```
git status
```

**9.** Commit your changes .

```
git commit -m "Relevant message"
```

**10.** Push the committed changes in your feature branch to your remote repo.

```
git push -u origin <your_branch_name>
```

**11.** To create a pull request, click on `compare and pull requests`. Please ensure you compare your feature branch to the desired branch of the repo you are suppose to make a PR to.


**12.** Then add an appropriate title and description to your pull request that explains your changes and efforts done.


**13.** Click on `Create Pull Request` on `main` branch.


## Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Follow the guidelines which is using standard. Any linting errors should be corrected before submittig a PR.
- Write and update tests.
- Keep your changes as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

Work in Progress pull requests are also welcome to get feedback early on, or if there is something blocked you.

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)
