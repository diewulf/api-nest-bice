Import-Module config_var

class Deployment {

    [string] $command
    [string] $yaml = $yaml
    [string] $version = $version

    Deployment(){
        $this.command = "gcloud app deploy $this.yaml --version=$this.version --promote"
    }

    Dev(){
        $this.version = $config_var:VERSION_APP_ENGINE_DEFAULT_DEV
        $this.yaml = $config_var:YAML_DEV
        Write-Host  $this.command
    }
   
}