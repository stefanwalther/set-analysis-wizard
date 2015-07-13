<%@ Page Title="" Language="C#" MasterPageFile="~/MP/ExamplePage.Master" AutoEventWireup="true" CodeBehind="Set-Analysis-Example--Some-Basic-Modifiers.aspx.cs" Inherits="qlikblog.Tools.SetAnalysisWizard.Web.Example_021" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">



<div style="margin-left: 10px;" id="divExampleContainer">
        <h2 class="examplePage">
            Set Analysis Examples - Basic Set Modifiers</h2>
        <p class="examplePage_Header">
            The following examples use very simple and basic Set Analysis expressions.
        </p>


        <div class="examplePage_Details ">
            <div class="example_Nr">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc">
                Returns the sales for region US disregarding/overriding the current selection in field "Region".
                <pre>sum({1&lt;Region = {'Eastern'}&gt;} Sales)</pre>
            </div>
            <div class="example_Url grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_OEFA" class="lnkOpen">Open wizard</a>
            </div>
        </div>

        <div class="examplePage_Details ">
            <div class="example_Nr">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc">
                Returns the sales for current selection, but with the selection in "Region" removed.
                <pre>sum({$&lt;Region = &gt;} Sales)</pre>
            </div>
            <div class="example_Url grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_IPB4" class="lnkOpen">Open wizard</a>
            </div>
        </div>
       
        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
               Calculate the Sum of Sales based on the current selection but exclude the product category "Confections" (field "ProductCategory").
                <pre>Sum({$&lt;ProductCategory-={'Confections'}&gt;}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_2X65" class="lnkOpen">Open Wizard</a>
            </div>
        </div>

        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
               Sum of Sales based on the current selection, but only consider Sales in the 1980's.<br />
                <pre>Sum({$&lt;Year={'198*'}&gt;}Sales</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_J791" class="lnkOpen">Open Wizard</a>
            </div>
        </div>

        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                Sum of Sales based on the current selection, but only consider years from 2000 to 2009, but exclude 2010, 2011, etc.
                <pre>Sum({$&lt;Year={'200*'}&gt;}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_XKFS" class="lnkOpen">Open Wizard</a>
            </div>
        </div>

        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
               Sum of Sales based on the current selection, but only consider the years 1970, 1980, 1990, etc.
                <pre>Sum({$&lt;Year={'19?0'}&gt;}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_NDL1" class="lnkOpen">Open Wizard</a>
            </div>
        </div>

        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                Sum of Sales based on the current selection, but consider only years greater than max(Year) and less than min(Year), so if you are having 2008, 2009, 2010 only the Sales of 2009 would be calculated.
                <pre>Sum({$&lt;Year={"&gt;$(=min(Year))&lt;$(=max(Year))"}&gt;}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_DN96" class="lnkOpen">Open Wizard</a>
            </div>
        </div>

    </div>

</asp:Content>
