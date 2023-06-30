name: Bug Report
description: File a bug report
title: "[BUG]: "
labels: ["bug", "triage"]
assignees:
  - octocat
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: Also tell us, what did you expect to happen?
      placeholder: Tell us what you see!
      value: "A bug happened!"
    validations:
      required: true
  - type: input
    id: version
    attributes:
      label: Version
      description: What version of our software are you running?
    validations:
      required: true
  - type: checkboxes
    id: browsers
    attributes:
      label: What browsers are you seeing the problem on?
      options:
        - label: Firefox
        - label: Chrome
        - label: Safari
        - label: Microsoft Edge
  - type: textarea
    id: logs
    attributes:
      label: Relevant log output
      description: Please copy and paste any relevant log output. This will be automatically formatted into code, so no need for backticks.
      render: shell
  - type: markdown
    attributes:
      value: |
        By submitting this issue, you agree to follow our [Code of Conduct](https://example.com)
