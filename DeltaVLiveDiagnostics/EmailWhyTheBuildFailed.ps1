EmailWhyTheBuildFailed.exe --jenkins-computer-name=$env:ComputerName --jenkins-url=$env:JENKINS_URL --build-pipeline-name=$env:PipelineJobName --jenkins-job-path=$env:JOB_NAME --build-configuration=Release --jenkins-build-number=$env:BUILD_ID --jenkins-job-workspace-folder=$env:WORKSPACE --from-address="Jenkins@Emerson.com" --to-addresses="Joshua.Leikam@Emerson.com,Neil.Justice@Emerson.com"
