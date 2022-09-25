using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace qlikblog.Tools.SetAnalysisWizard.Web.MP
{
    public partial class Page : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // The exact same code is placed in Page.Master and ExamplePage.Master
            // Further Improvement: If this will get expanded we should create a general master page to inherit from
            this.Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "versionInfo", "var assemblyVersion = '" + Global.VersionInfo.GetVersionInfo() + "';", true);
            var isDebug = false;
#if DEBUG
            isDebug = true;
#endif
            Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "PAGE_DEBUG", "var PAGE_DEBUG = " + isDebug.ToString().ToLower() + ";", true);


        }
    }
}