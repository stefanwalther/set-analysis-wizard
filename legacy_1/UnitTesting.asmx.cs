using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.IO;

namespace qlikblog.Tools.SetAnalysisWizard.Web
{
    /// <summary>
    /// Summary description for UnitTesting
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class UnitTesting : System.Web.Services.WebService
    {

        [WebMethod]
        public string[] GetTestKeys()
        {
            string retVal = string.Empty;
            List<string> files = new List<string>();
            string filePath = Server.MapPath("~/Storage/Examples/");
            DirectoryInfo dir = new DirectoryInfo(filePath);
            foreach (FileInfo fileInfo in dir.GetFiles("_*.txt"))
            {
                files.Add(Path.GetFileNameWithoutExtension(fileInfo.Name));
            }
            return files.ToArray();
        }
    }
}
