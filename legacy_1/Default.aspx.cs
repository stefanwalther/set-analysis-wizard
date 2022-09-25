using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace qlikblog.Tools.SetAnalysisWizard.Web
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string queryString = this.Request.QueryString["sa"] ?? "";
            Response.Redirect("QlikView-SetAnalysis_Wizard_and_Generator.aspx?sa=" + queryString);
        }
    }
}