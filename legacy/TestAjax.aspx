<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestAjax.aspx.cs" Inherits="qlikblog.Tools.SetAnalysisWizard.Web.WebForm1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script language="javascript" type="text/javascript" src="library/js/jquery-1.6.4.min.js"></script>
    <script language="javascript" type="text/javascript">

        $(document).ready(function () {

            var $StorageKey = '';
            var $Session = '';
            var myObject = new Object();
            myObject.id = 10;
            myObject.value = 'this is the value';

            var myObjectString = JSON.stringify(myObject);
            //alert(myObjectString);


            $('#cmdTest').click(function () {

                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "SetAnalysisWizardStorage.asmx/SaveSetAnalysisDefinition",
                    //'{"SaveSetAnalysisDefinition":' + myObjectString + '}'
                    data: "{key:'" + $StorageKey + "',session:'" + $Session + "',value:'" + myObjectString + "'}",
                    dataType: "json",
                    success: OnWSSuccess,
                    error: OnWSError
                }); // (ajax)
            });

            function OnWSSuccess(result) {
                $StorageKey = result.d.Key;
                $Session = result.d.Session;
                return;
            }
            function OnWSError(result) {
                alert('error\n' + result.status + '\n' + result.statusText);
            }


        });                      //(document.ready)

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="_scriptManager" runat="server">
      <Services>
        <asp:ServiceReference Path="SetAnalysisWizardStorage.asmx" />
      </Services>
    </asp:ScriptManager>

    <div>
        <input type="button" id="cmdTest" value="Test" />
    </div>
    </form>
</body>
</html>
