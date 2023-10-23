class VersionList
{
    [string] $command

    VersionList()
    {
        $this.command = "gcloud app versions list"
    }

    # Métodos
    [string] get()
    {
        $results = Invoke-Expression $this.command 
        Write-Host $results
        return $results
    }
}