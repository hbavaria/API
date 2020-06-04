.\gen_env.cmd
if ($LastExitCode -ne 0)
{
   exit $LastExitCode
}
.\build_all.cmd
