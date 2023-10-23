# MainModule.psm1
class Main
{
    [string] $banner
    Main(){
        $this.banner = "oli"
    }
}

Export-ModuleMember -Function *
