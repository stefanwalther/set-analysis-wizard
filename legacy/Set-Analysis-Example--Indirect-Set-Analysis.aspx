<%@ Page Title="" Language="C#" MasterPageFile="~/MP/ExamplePage.Master" AutoEventWireup="true" CodeBehind="Set-Analysis-Example--Indirect-Set-Analysis.aspx.cs" Inherits="qlikblog.Tools.SetAnalysisWizard.Web.Set_Analysis_Example__Indirect_Set_Analysis" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<div style="margin-left: 10px;" id="divExampleContainer">
        <h2 class="examplePage">
           Set Analysis Examples - Indirect Set Modifiers/Indirect Set Analysis</h2>
        <p class="examplePage_Header">
            These examples demonstrate the advanced technique of indirect sets.
        </p>

                <!-- Indirect Set Analysis -->
        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                Returns the Sum of Sales for the current selection, but only for those customers that have bought the product "Shoe".<br />
                <i>(This is one of the examples of the "QlikView Help").</i>
                <pre>Sum({$&lt;Customer=P({1&lt;Product={'Shoe'}&gt;}Customer)&gt;}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_OTI1" class="lnkOpen">Open Wizard</a>
            </div>
        </div>

        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
               Return the Sum of Sales for the current selection, but only for those customers who have ever supplied the product "Shoe".
                <pre>Sum({$&lt;Customer=P({1&lt;Product={'Shoe'}&gt;}Supplier)&gt;}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_ZYP3" class="lnkOpen">Open Wizard</a>
            </div>
        </div>

</div>
</asp:Content>
