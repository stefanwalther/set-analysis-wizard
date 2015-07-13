<%@ Page Title="SA Unit Tests" Language="C#" MasterPageFile="~/MP/Page.Master" AutoEventWireup="true" CodeBehind="SetAnalysisWizard_UnitTests.aspx.cs" Inherits="qlikblog.Tools.SetAnalysisWizard.Web.SetAnalysisWizard_UnitTests"%>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

<!-- jQuery QUnit -->
<script language="javascript" type="text/javascript" src="library/js/qunit.js"></script>
<link rel="Stylesheet" type="text/css" href="library/css/qunit.css" />


<script language="javascript" type="text/javascript" src="library/js/SetAnalysisWizard_UnitTests_Core.js"></script>
<script language="javascript" type="text/javascript" src="library/js/SetAnalysisWizard_UnitTests_Utils.js"></script>
<script language="javascript" type="text/javascript" src="library/js/SetAnalysisWizard_UnitTests_Examples.js"></script>

<script language="javascript" type="text/javascript">



</script>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div>
        <h2>Unit Testing</h2>

        <div id="qUnitContainer">
            <h1 id="qunit-header">QUnit example</h1>  
            <h2 id="qunit-banner"></h2>  
            <h2 id="qunit-userAgent"></h2>  
            <ol id="qunit-tests">
            </ol>
        </div>
    </div>

</asp:Content>
