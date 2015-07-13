<%@ Page Title="" Language="C#" MasterPageFile="~/MP/ExamplePage.Master" AutoEventWireup="true" CodeBehind="Set-Analysis-Example--Some-Basic-Modifiers-Ad-Hoc-Expressions.aspx.cs" Inherits="qlikblog.Tools.SetAnalysisWizard.Web.Set_Analysis_Example__Some_Basic_Modifiers_Ad_Hoc_Expressions" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


<div style="margin-left: 10px;" id="divExampleContainer">
        <h2 class="examplePage">
            Set Analysis Examples - Ad Hoc Expressions</h2>
        <p class="examplePage_Header">
            These examples use <i>Ad Hoc Expressions</i> within a Set Analysis Expressions (<span class="redBold">marked red</span>).
        </p>

        
        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
               Sum of Sales based on the current selection, but calculate only Sales in the last/current year.<br />
                <pre>Sum({$&lt;Year={<span class="redBold">$(=max(Year))</span>}&gt;}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_4E53" class="lnkOpen">Open Wizard</a>
            </div>
        </div>

        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
               Return Sum of Sales only for the year before the maximum year.
                <pre>Sum({$&lt;Year={<span class="redBold">$(=Max(Year)-1)</span>}&gt;}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_OXLC" class="lnkOpen">Open Wizard</a>
            </div>
        </div>

</div>


</asp:Content>
