<%@ Page Title="" Language="C#" MasterPageFile="~/MP/ExamplePage.Master" AutoEventWireup="true" CodeBehind="Set-Analysis-Example--Simple-Expressions.aspx.cs" Inherits="qlikblog.Tools.SetAnalysisWizard.Web.Example_001" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">



</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


<div style="margin-left: 10px;" id="divExampleContainer">
        <h2 class="examplePage">
            Basic Set Analysis Examples - Simple Expressions</h2>
        <p class="examplePage_Header">
            The following examples use very simple and basic Set Analysis expressions.
        </p>


        <div class="examplePage_Details">
            <div class="example_Nr">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc">
                <b>Sum</b> of "Sales" based on the <b>current selection</b><br />
                <pre>Sum({$}Sales)</pre>
            </div>
            <div class="example_Url grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_001" class="lnkOpen">Open
                    wizard</a>
            </div>
        </div>


        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                <b>Count</b> values of field "Customer" based on the <b>current selection</b><br />
                <pre>Count({$}Customer)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_002" class="lnkOpen">Open
                    wizard</a>
            </div>
        </div>


        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                <b>Sum</b> of "Sales" based on <b>all values</b>, ignoring any selection.<br />
                <pre>Sum({1}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_003" class="lnkOpen">Open
                    wizard</a>
            </div>
        </div>


        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                <b>Sum</b> of "Sales" based on the <b>bookmark with the ID</b> "BM01".
                <pre>Sum({BM01}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_004" class="lnkOpen">Open
                    wizard</a>
            </div>
        </div>


        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                Calculate the sum of "Sales" for <b>everything that the current selection excludes</b>.
                <pre>Sum({1-$}Sales)</pre>
            </div>
            <div class="example_Url   grayTheme">
                <div class="grayTheme">
                    <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_005" class="lnkOpen">Open
                        wizard</a>
                </div>
            </div>
        </div>


        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                Calculate the <b>sum</b> of "Sales" based on the <b>previous selection</b>.
                <pre>Sum({$1}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_006" class="lnkOpen">Open
                    wizard</a>
            </div>
        </div>


        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                Calculate the <b>sum</b> of "Sales" based on the <b>next selection</b>.
                <pre>Sum({$_1}Sales)</pre>
            </div>
            <div class="example_Url   grayTheme">
                <div class="grayTheme">
                    <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_007" class="lnkOpen">Open
                        wizard</a>
                </div>
            </div>
        </div>


        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                Calculate the sum of "Sales" based on the <b>2nd previous selection</b>.
                <pre>Sum({$2}Sales)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_008" class="lnkOpen">Open
                    wizard</a>
            </div>
        </div>


        


        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                Calculate the <b>sum of the expression</b> "ItemsSold*ItemPrice" based on the <b>current
                selection</b>.<br />
                <i>Note: Be carefull when using expressions within a Set Analysis expression!</i>
                <pre>Sum({$}ItemsSold*ItemPrice)</pre>
            </div>
            <div class="example_Url  grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_010" class="lnkOpen">Open
                    wizard</a>
            </div>
        </div>

        
    </div>

</asp:Content>
