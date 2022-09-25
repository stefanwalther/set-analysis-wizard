<%@ Page Title="" Language="C#" MasterPageFile="~/MP/ExamplePage.Master" AutoEventWireup="true" CodeBehind="Set-Analysis-Example--Some-Basic-Modifiers-Search-Expressions.aspx.cs" Inherits="qlikblog.Tools.SetAnalysisWizard.Web.Set_Analysis_Example__Some_Basic_Modifiers_Search_Expressions" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<div style="margin-left: 10px;" id="divExampleContainer">
        <h2 class="examplePage">
            Set Analysis Examples - Search Expressions</h2>
        <p class="examplePage_Header">
            The examples below demonstrate the ability of defininig search expressions within a Set Analysis expression.
        </p>

        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                Similar as above:<br />
                Sum of Sales based on the current selection, but calculate only Sales for those years <b>before the maximum year.</b><br /><br />(e.g. if the maximum year is 2010, you will only get 2008 and 2009).
                <pre>Sum({$&lt;Year={<span class="redBold">"&lt;</span>$(=max(Year))<span class="redBold">"</span>}&gt;}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_29C5" class="lnkOpen">Open Wizard</a>
            </div>
        </div>

        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                Return the Sum of Sales for all years greater than 2009.
                <pre>Sum({$&lt;Year={<span class="redBold">&quot;&gt;</span>2009<span class="redBold">&quot;</span>}&gt;}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_DA4H" class="lnkOpen">Open Wizard</a>
            </div>
        </div>

        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
               Calculate the Sum of Sales considering only records in the field Region <b>containing the value</b> "easter", so this will return Sales for "Eastern", "Western" but not for "Northern" and "Southern".
                <pre>Sum({$&lt;Region={<span class="redBold">&quot;</span>*easter*<span class="redBold">&quot;</span>}&gt;}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_NHFW" class="lnkOpen">Open Wizard</a>
            </div>
        </div>

        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                Calculate the Sum of Sales considering only records in the field Region ending with "thern", so this will return Sales for "Northern", "Southern", but not for "Eastern" and "Western".
                <pre>Sum({$&lt;Region={<span class="redBold">&quot;</span>*thern<span class="redBold">&quot;</span>}&gt;}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_1ZZ2" class="lnkOpen">Open Wizard</a>
            </div>
        </div>

</div>


</asp:Content>
