# DeltaV Live Diagnostics

In essence, DeltaV Live Diagnostics is a Web App that makes requests to the Oe Web Server to provide various performance and diagnostics information for a given DeltaV Live Instance. Such information includes display data (JSON objects, size, etc.) and subscription/write load times for parameters. For more details and documentation, see the DeltaV Live Diagnostics folder at: https://emerson.sharepoint.com/sites/autosolpss/psstech/PSSTechnology/DeltaV/DeltaVLive/Shared%20Documents/Forms/AllItems.aspx

# DeltaV Live Versions Supported:
* 15.3 Debug
* 14.3.1 Debug

# Major Dependencies

## Node JS (Javascript runtime)

1. Install NodeJS at https://nodejs.org/en/ (at least v10.15.3)

## MongoDB (Non-relational database to store performance data)

2. Install MongoDB Community Edition (v4.2.2 at the time of writing this documentation) at https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/. The .msi can be downloaded from https://www.mongodb.com/download-center/community?jmp=docs. Run the .msi installer and walk through the wizard, leaving the default settings.

# Installation

## Clone the Repo

1. On the drive that has DeltaV installed, cd into your desired directory, and run:
   `git clone https://usaust-tfsb1/Technology4/_git/PhoenixInterns`.
   If you get a certificate error when trying to clone the repo, try running:
   `git config --global http.sslVerify false`
2. Run: `cd PhoenixInterns\`

## Generate Default Environment Variables

3. Run: `gen_env.cmd`

## Install Dependencies and Build

4. Run: `build_all.cmd`

## Ensure DeltaV Live is Running

5. Before proceeding to the next step, please make sure that DeltaV Live and the associated services are running.

## Start services

6. Run `start_all.cmd`

- Note: Please wait about 30 seconds for the services to start before proceeding to the next step.

## View in Browser

7. Open **[localhost:3000](http://localhost:3000)** in your browser (works best in chrome)
