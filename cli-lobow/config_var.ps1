$ID_PROJECT = "peak-vortex-396916"

# DEV
$VERSION_APP_ENGINE_DEFAULT_DEV = "20230920t165946"
$YAML_DEV = "../app.yaml"
# gcloud app deploy .\app.yaml --version=20230920t165946 --promote
# PROD
$VERSION_APP_ENGINE_DEFAULT_PROD = "20230824t151309"
$YAML_PROD = "../app-prod.yaml"

# gcloud app deploy .\app-prod.yaml --version=20230824t151309 --promote
$banner = @"
       .__  .__  .__        ___.                  
  ____ |  | |__| |  |   ____\_ |__   ______  _  __
_/ ___\|  | |  | |  |  /  _ \| __ \ /  _ \ \/ \/ /
\  \___|  |_|  | |  |_(  <_> ) \_\ (  <_> )     / 
 \___  >____/__| |____/\____/|___  /\____/ \/\_/  
     \/                          \/               

"@

Export-ModuleMember -Variable ID_PROJECT

Export-ModuleMember -Variable VERSION_APP_ENGINE_DEFAULT_DEV
Export-ModuleMember -Variable YAML_DEV

Export-ModuleMember -Variable VERSION_APP_ENGINE_DEFAULT_PROD
Export-ModuleMember -Variable YAML_PROD
Export-ModuleMember -Variable banner