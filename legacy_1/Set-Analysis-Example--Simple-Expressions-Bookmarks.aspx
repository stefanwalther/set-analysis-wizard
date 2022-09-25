<%@ Page Title="" Language="C#" MasterPageFile="~/MP/Page.Master" AutoEventWireup="true" CodeBehind="Set-Analysis-Example--Simple-Expressions-Bookmarks.aspx.cs" Inherits="qlikblog.Tools.SetAnalysisWizard.Web.Set_Analysis_Example__Simple_Expressions_Bookmarks" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<div style="margin-left: 10px;" id="divExampleContainer">
        <h2 class="examplePage">
            Basic Set Analysis Examples - Simple Expressions Using Bookmarks</h2>
        <p class="examplePage_Header">
            The following examples use very simple and basic Set Analysis expressions based on bookmarks.
        </p>

        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                Calculate the <b>average</b> of "Sales" based on the <b>server bookmark</b> with the id
                "BM01".
                <pre>Avg({Server\BM01}Sales)</pre>
            </div>
            <div class="example_Url   grayTheme">
                <div class="grayTheme">
                    <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_009" class="lnkOpen">Open
                        wizard</a>
                </div>
            </div>
        </div>
        
        <div class="examplePage_Details">
            <div class="example_Nr ">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc ">
                Calculate the <b>Sum</b> of "Sales" based on the <b>document bookmark</b> with the id
                "BM01".
                <pre>Sum({Document\BM01}Sales)</pre>
            </div>
            <div class="example_Url   grayTheme">
                <div class="grayTheme">
                    <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_NT6B" class="lnkOpen">Open
                        wizard</a>
                </div>
            </div>
        </div>


        <div class="examplePage_Details">
            <div class="example_Nr example_odd">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc example_odd">
                Calculate the sum of sales based on the <b>current selection AND the server-bookmark</b> with the Id "BM01".
                <pre>Sum({$+Server\BM01}Sales)</pre>
            </div>
            <div class="example_Url example_odd  grayTheme">
                <div class="grayTheme">
                    <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_S4ZS" class="lnkOpen">Open
                        wizard</a>
                </div>
            </div>
        </div>


        <div class="examplePage_Details">
            <div class="example_Nr example_even">
                <%=(StartNo++).ToString() %>
            </div>
            <div class="example_Desc example_even">
                Calculate the Sum of "Sales" based on the current selection except those records belonging to the bookmark with the Id 'Server\BM01'.<br />
                <pre>Sum({$-Server\BM01}Sales)</pre>
            </div>
            <div class="example_Url example_even grayTheme">
                <a href="<%=qlikblog.Tools.SetAnalysisWizard.Web.Global.Constants.TargetPage%>?sa=_6ON8" class="lnkOpen">Open
                    wizard</a>
            </div>
        </div>


        
</div>



</asp:Content>
