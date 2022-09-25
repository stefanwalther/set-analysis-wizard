using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Text;
using System.IO;

namespace qlikblog.Tools.SetAnalysisWizard.Web
{
    /// <summary>
    /// Summary description for SetAnalysisWizardStorage
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SetAnalysisWizardStorage : System.Web.Services.WebService
    {

        #region Storage
        /// <summary>
        /// Note: if key starts with underscore (_) we'll search in another directory
        /// (Used for the examples)
        /// </summary>
        /// <param name="key"></param>
        /// <param name="session"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        [WebMethod]
        //Todo: Check the code twice
        //Todo: test the code (by iterating 100.000 times)
        //Todo: why calling the GetFilePath() several times?
        public WSReturnValue SaveSetAnalysisDefinition(object key, object session, object value)
        {
            value = Server.UrlDecode(value.ToString());
            string sessionToSave = string.Empty;
            string keyToSave = string.Empty;
            bool useSpecialDir = key.ToString().StartsWith("_");
            
            bool checkProceed = false; // Check if we can proceed to write the file
            string fileContent = string.Empty;

            // If we are dealing with an existing/passed key and a passed session
            // we have to check the session id, which is saved in the first line
            // of the storage file
            if (key != null && !string.IsNullOrEmpty((string)key) && !string.IsNullOrEmpty((string)session))
            {
                string passedKey = (string)key;
                string existingFilePath = Path.Combine(GetFilePath(useSpecialDir), passedKey + ".txt");
                if (File.Exists(existingFilePath))
                {
                    // Open the file, get the content and check if the session from the
                    // file matches with the passed session key
                    fileContent = ReadFile(existingFilePath);
                    if (fileContent != null)
                    {
                        string savedSession = GetLineFromString(fileContent, 1);
                        if (savedSession == (string)session)
                        {
                            keyToSave = (string)key; // Use the existing key
                            sessionToSave = (string)session; // Use the existing session key
                            checkProceed = true;
                        }
                    }
                }
            }

            // No existing key is passed, so we have a new item
            if (key == null || string.IsNullOrEmpty((string)key))
            {
                sessionToSave = System.Guid.NewGuid().ToString();
                keyToSave = GetUniqueId(GetFilePath(useSpecialDir));
                checkProceed = true; 
            }



            if (checkProceed)
            {
                string uniqueFileName = keyToSave + ".txt";
                string uniqueFilePath = GetFilePath(useSpecialDir) + uniqueFileName;

                

                string valueToSave = sessionToSave + "\r\n" + value;

                //Todo: To prevent unnecessary writing we could check the existing content
                // (which is alreay loaded above) with the content which should be saved to the file
                if (fileContent != valueToSave)
                {
                    // Delete the existing file (check have be made before)
                    System.IO.File.Delete(uniqueFilePath);
                    
                    // Write the new file
                    WriteToFile(uniqueFilePath, (string)valueToSave);
                }

            } // (checkProceed)

            WSReturnValue retVal = new WSReturnValue();
            retVal.Session = sessionToSave;
            retVal.Key = keyToSave;

            return retVal;
        } // (SaveSetAnalysisDefinition)

        #endregion //Storage

        #region Get
        [WebMethod]
        public string GetSetAnalysisDefinition(object key)
        {
            bool useSpecialDir = key.ToString().StartsWith("_");
            string filePath = Path.Combine(GetFilePath(useSpecialDir), key + ".txt");

            //Todo: Remove the first line instead of returning just the 2nd line ...
            return GetLineFromString(File.ReadAllText(filePath), 2);
        }
        #endregion // Get

        #region Helper Methods

        
        /// <summary>
        /// </summary>
        /// <param name="usesSpecialDir">If true, the subdirectory "Examples" will be returned"</param>
        /// <returns></returns>
        private string GetFilePath(bool usesSpecialDir)
        {
            if (usesSpecialDir)
            {
                return Server.MapPath("~/Storage/Examples/");
            }
            else
            {
                return Server.MapPath("~/Storage/");
            }
        }

        private string GetUniqueId(string basePath) {

            bool isUnique = false;
            string uniqueId = string.Empty;
            int length = 4;
            int counter = 0;

            while (!isUnique)
            { 
                // Reset if after 1000 iteration no unique string has been found
                if (counter >= (int)Math.Round(Math.Pow(33,length),0)-1)
                {
                    length++;
                    counter = 0;
                }
                uniqueId = GetRandomString(length);
                if (!System.IO.File.Exists(System.IO.Path.Combine(basePath + uniqueId + ".txt")))
                {
                return uniqueId;
                }
                counter ++;
            }
            return System.Guid.NewGuid().ToString();
            
        }

        public static string GetRandomString(int length)
        {
            string charPool = "ABCDEFGHIJKLMNOPQRSTWXYZ1234567890";
            StringBuilder sb = new StringBuilder();
            Random rnd = new Random();

            while ((length--) > 0)
                sb.Append(charPool[(int)(rnd.NextDouble() * charPool.Length)]);

            return sb.ToString();
        } 

        /// <summary>
        /// Stores a given string to a file.
        /// If any exception is thrown (file locked, etc.) the WriteToFile 
        /// tries writing to the file for 100 times (with a 10 millisecond sleep between 
        /// the iterations).
        /// </summary>
        /// <param name="filePath">Absolute file path.</param>
        /// <param name="value">Value to be stored in the file.</param>
        /// <returns>true if suceeded, otherwise false</returns>
        private static bool WriteToFile(string filePath, string value)
        {
            int i = 0;
            while (i < 100)
            {
                try
                {
                    System.IO.File.WriteAllText(filePath, value);
                }
                catch (Exception)
                {
                    System.Threading.Thread.Sleep(10);
                    i++;
                    continue;
                }
                return true;
            }
            return false;
        }

        private static string ReadFile(string fileName)
        {
            return System.IO.File.ReadAllText(fileName);
        }

        private string GetLineFromString(string val, int line)
        {
            string[] lines = val.Split('\n');
            return lines[line-1].Replace("\r","");
        }

        #endregion //Helper Methods

        #region Class for Webservice Result
        /// <summary>
        /// Class for returning the results of the webservice.
        /// </summary>
        public class WSReturnValue
        {
            /// <summary>
            /// Status can either be 'OK' or 'Error'.
            /// In case of 'Error, ErrorMessage contains the detailed error message.
            /// </summary>
            public string Status;

            /// <summary>
            /// Detailed Error Message.
            /// </summary>
            public string ErrorMessage;

            /// <summary>
            /// In case of successful storage of the values the key of the file
            /// will be returned.
            /// </summary>
            public string Key;

            /// <summary>
            /// Current User Session (a System.Guid).
            /// </summary>
            public string Session;
        }

        #endregion //(Class for Webservice Result)
    }
}
