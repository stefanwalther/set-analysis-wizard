<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BlockUI_Test.aspx.cs" Inherits="qlikblog.Tools.SetAnalysisWizard.Web.BlockUI_Test" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="library/js/jquery-1.6.4.min.js" type="text/javascript"></script>
    <script src="library/js/jquery.blockUI.js" type="text/javascript"></script>
    <script src="library/js/SetAnalysisWizard.js" type="text/javascript"></script>

<script language="javascript" type="text/javascript">

        $(document).ready(function () {

            $('#cmdTest').click(function () {
                $.blockUI();
            });

        });


    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <input type="button" id="cmdTest" value="block" />
    <input type="button" id="cmdUnblock" value="unblock" />
    </div>
    </form>
</body>
</html>
