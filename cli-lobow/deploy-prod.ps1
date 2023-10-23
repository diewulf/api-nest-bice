# importo modulo donde estan variables
Import-Module config_var
$version = $config_var:VERSION_APP_ENGINE_DEFAULT_PROD

# Ingresa el archivo yaml de la aplicación
$yaml = $config_var:YAML_PROD

# Despliega la aplicación
gcloud app deploy $yaml --version=$version --promote