<%@ Page Title="" Language="C#" MasterPageFile="~/MP/Page.Master" AutoEventWireup="true" CodeBehind="QlikView-SetAnalysis_Wizard_and_Generator.aspx.cs" Inherits="qlikblog.Tools.SetAnalysisWizard.Web.QlikView_SetAnalysis_Wizard_and_Generator" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <title>Set Analysis Wizard for QlikView | qlikblog.at</title>
    <meta name="AUTHOR" content="Stefan Walther" />
    <meta name="DESCRIPTION" content="Set Analysis Wizard for QlikView. The easier way to create complex Set Analysis expressions for QlikView. Free to use." />
    <meta name="KEYWORDS" content="QlikView,Set Analysis,Wizard,expression,formula,QlikView 8.5,QlikView 9, QlikView 10, QlikView 11" />
    <meta http-equiv="CONTENT-LANGUAGE" content="en" /> 
    <meta http-equiv="CACHE-CONTROL" content="no-cache" /> 
    <meta http-equiv="PRAGMA" content="no-cache" /> 
    <link rel="SHORTCUT ICON" href="favicon.ico" type="image/x-icon" />

   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<br />
<h1 id="h1Main">Set Analysis Wizard for QlikView</h1>

<h2 class="h2Page">
The easier way to create Set Analysis Expressions :)
</h2>
    
    <div id="divMain" class="hidden">
    <div id="tabs" style="width: 1000px">
        <!-- Tab Header -->
        <ul>
            <li><a href="#tabs-1">Set Analysis Definition</a></li>
            <li><a href="#tabs-2">Generated Expression (+Comments)</a></li>
            <li><a href="#tabs-3">Examples</a></li>
            <li><a href="#tabs-4">? Help</a></li>
            <li><a href="#tabs-6">Debug Output</a></li>
        </ul>
        <!-- Set Analysis Definition -->
        <div id="tabs-1">
            <div class="divClearForm">
                <a href="QlikView-SetAnalysis_Wizard_and_Generator.aspx" class="aClearForm">Reset Wizard</a>
            </div>
            <div id="divLeftX">

                <h2>
                    1.) Define the set ...</h2>
                <div class="explanation">
                    First define the basis expression you would like to calculate. Hover the <a href="javascript:void(0);"
                        title="<b>Inline hints:</b><br/>Yes, you'll see hints like this one when hovering those icons ... :)"
                        class="qtippable"><span class="ui-icon ui-icon-info" style="display: inline-block;
                            margin-right: .1em; vertical-align: text-bottom; cursor: help;"></span></a>
                    icons for further information.<br />
                </div>
                <br />
                <div style="display: block;">
                    <div id="divSetIdentifier" style="display: inline-block;">
                        <label style="display: inline-block; width: 80px;" for="cboSetIdentifier">
                            Based on</label>
                        <select id="cboSetIdentifier" class="clearable" style="display: inline-block; width: 350px;
                            height: 30px;">
                            <optgroup label="Standard Sets">
                                <option value="$" text="the current selection">the current selection</option>
                                <option value="1" text="all values">all values</option>
                                <option value="1-$" text="everything that the current selection excludes">everything that the current selection excludes</option>
                            </optgroup>
                            <optgroup label="Set Based on Previous/Next Selections">
                                <option value="$1" text="the previous selection">the previous selection</option>
                                <option value="$_1" text="the next selection">the next selection</option>
                                <option disabled="disabled"></option>
                                <option value="$_2" text="the 2nd next selection">the 2nd next selection</option>
                                <option value="$_3" text="the 3rd next selection">the 3rd next selection</option>
                                <option value="$2" text="the 2nd previous selection">the 2nd previous selection</option>
                                <option value="$3" text="the 3rd previous selection">the 3rd previous selection</option>
                            </optgroup>
                            <optgroup label="Bookmark Based Sets">
                                <option value="bookmark" text="the bookmark with the Id '{0}'">the bookmark with a given Id</option>
                                <option value="$+bookmark" text="the current selection and the bookmark with the Id '{0}'">the current selection and the bookmark with the given Id</option>
                                <option value="$-bookmark" text="the current selection except those records belonging to the bookmark with the Id '{0}'">the current selection except those records belonging to the bookmark with a given Id</option>
                                <option value="$*bookmark" text="the intersection between the current selection and the bookmark with the Id '{0}'">the intersection between the current selection and the bookmark with a given Id</option>
                            </optgroup>
                            <!--<optgroup label="Advanced Sets"></optgroup>-->
                            <!--<optgroup label="Selection history based sets"></optgroup>-->
                        </select>
                        <a href="javascript:void(0);" title="<b>Select the basis for your set.<b>" class="qtippable"
                            tabindex="10000"><span class="ui-icon ui-icon-info" style="display: inline-block;
                                margin-right: .3em; cursor: help;"></span></a>
                    </div>
                    <div id="divBookmark" class="hidden">
                        <input type="text" id="txtBookmarkId" style="width: 200px" />
                        <a href="javascript:void(0);" class="qtippable" title="Enter the Id or the name of the bookmark.<br /><br />E.g.: <pre>BM01</pre>"
                            tabindex="10000"><span class="ui-icon ui-icon-info" style="display: inline-block;
                                margin-right: .3em; cursor: help;"></span></a>
                    </div>
                </div>
                <div style="margin-top: 5px;">
                    <label style="display: inline-block; width: 80px;" for="cboAggregationType">
                        calculate the</label>
                    <select id="cboAggregationType" class="clearable" style="width: 300px; height: 30px;">
                        <optgroup label="Basis Aggregation Functions">
                            <option>Sum</option>
                            <option>Min</option>
                            <option>Max</option>
                            <option>Only</option>
                            <option>Mode</option>
                            <option>FirstSortedValue</option>
                        </optgroup>
                        <optgroup label="String Aggregation Functions">
                            <option>MinString</option>
                            <option>MaxString</option>
                            <option>Concat</option>
                        </optgroup>
                        <optgroup label="Counter Aggregation Functions">
                            <option>Count</option>
                            <option>NumericCount</option>
                            <option>TextCount</option>
                            <option>NullCount</option>
                            <option>MissingCount</option>
                        </optgroup>
                        <optgroup label="Statistical Aggregation Functions">
                            <option>Avg</option>
                            <option>stdev</option>
                            <option>median</option>
                            <option>fractile</option>
                            <option>skew</option>
                            <option>kurtosis</option>
                            <option>correl</option>
                            <option>sterr</option>
                            <option>steyx</option>
                            <option>linest_m</option>
                            <option>linest_b</option>
                            <option>linest_r2</option>
                            <option>linest_sem</option>
                            <option>linest_seb</option>
                            <option>linest_sey</option>
                            <option>linest_df</option>
                            <option>linest_f</option>
                            <option>linest_ssreg</option>
                            <option>linest_ssresid</option>
                        </optgroup>
                        <optgroup label="Financial Aggregation Functions">
                            <option>irr</option>
                            <option>xirr</option>
                            <option>npv</option>
                            <option>xnpv</option>
                        </optgroup>
                        <optgroup label="Statistical Test Functions">
                            <option>chi2test_p</option>
                            <option>chi2test_df</option>
                            <option>chi2test_chi2</option>
                            <option>TTest_t</option>
                            <option>TTest_df</option>
                            <option>TTest_sig</option>
                            <option>TTest_dif</option>
                            <option>TTest_sterr</option>
                            <option>TTest_conf</option>
                            <option>TTest_lower</option>
                            <option>TTest_upper</option>
                            <option>TTestw_t</option>
                            <option>TTestw_df</option>
                            <option>TTestw_sig</option>
                            <option>TTestw_dif</option>
                            <option>TTestw_sterr</option>
                            <option>TTestw_conf</option>
                            <option>TTestw_lower</option>
                            <option>TTestw_upper</option>
                            <option>TTest1_t</option>
                            <option>TTest1_df</option>
                            <option>TTest1_sig</option>
                            <option>TTest1_dif</option>
                            <option>TTest1_sterr</option>
                            <option>TTest1_conf</option>
                            <option>TTest1_lower</option>
                            <option>TTest1_upper</option>
                            <option>TTest1w_t</option>
                            <option>TTest1w_df</option>
                            <option>TTest1w_sig</option>
                            <option>TTest1w_dif</option>
                            <option>TTest1w_sterr</option>
                            <option>TTest1w_conf</option>
                            <option>TTest1w_lower</option>
                            <option>TTest1w_upper</option>
                            <option>ZTest_z</option>
                            <option>ZTest_sig</option>
                            <option>ZTest_dif</option>
                            <option>ZTest_sterr</option>
                            <option>ZTest_conf</option>
                            <option>ZTestw_z</option>
                            <option>ZTestw_sig</option>
                            <option>ZTestw_dif</option>
                            <option>ZTestw_sterr</option>
                            <option>ZTestw_conf</option>
                        </optgroup>
                    </select>
                    <a href="javascript:void(0);" class="qtippable" title="<b>Select one of the given aggregation types.</b>"
                        tabindex="10000"><span class="ui-icon ui-icon-info" style="display: inline-block;
                            margin-right: .3em; cursor: help;"></span></a>
                    <label for="txtFieldExpression">
                        of</label>
                    <input type="text" id="txtFieldExpression" style="width: 260px;" />
                    <a href="javascript:void(0);" class="qtippable" title="<b>Field name or expression:</b><br/><br/>Enter either a field name or a simple expression here.<br /><br /><b>Examples:</b><hr class='noshade' /><br /> Field: <pre>Sales</pre><br/>Simple Expression: <pre>Sales*FlagBudget</pre><i>Use expressions carefully! Have a look at the QlikView Reference manual for further information!</i><br/><hr /><b>Note:</b><br/>If the field name contains spaces just enter the field name as it is, the necessary brackets ( [ and ] ) will be added automatically."
                        tabindex="10000"><span class="ui-icon ui-icon-info" style="display: inline-block;
                            margin-right: .3em; cursor: help;"></span></a>
                </div>
                <br />
                <div id="divPersonalCommentEOF">
                    <a href="#" id="lnkAddPersonalComment">Add Personal Comment</a>
                </div>
                <div id="divPersonalComment" style="display: none;">
                    <div class="above">
                        <label for="txtPersonalComment" id="lblPersonalComment">
                            Personal Comment:</label><a id="lnkPersonalCommentRemove" style="margin-left: 5px;
                                cursor: pointer; cursor: hand;">(hide)</a></div>
                    <textarea id="txtPersonalComment" style="width: 690px; height: 75px;" rows="4" cols="60"></textarea>
                    <a href="javascript:void(0);" class="qtippable" title="<b>Personal Comment:</b><br/><br/>Just add any personal comment here ...<br/>This will not have any impact on the Set Analysis expression ...<br/><br/>This is just for personal commenting purposes ... :)"
                        tabindex="10000"><span class="ui-icon ui-icon-info" style="display: inline-block;
                            margin-right: .3em; cursor: help;"></span></a>
                </div>
            </div>
            <div>
                <h2>
                    2.) Modify the set ...</h2>
                <a href="javascript:void(0);" id="a_addSetModifierAction">
                    <img src="library/icons/add.png" border="0" style="padding-top: 0px; padding-right: 1px;
                        padding-bottom: 0px; vertical-align: text-bottom;" alt="Add an action to modify the set defined above" />
                    Add an action to modify the set defined above</a>
                <br />
                <div id="divActionContainer">
                </div>
                <div id="divActionContainerEmpty">
                    <div id="divActionContainerEmptyContent" class="noActions">
                        No actions defined so far ...</div>
                </div>
                <h2>
                    3.) Set Analysis Expression Preview:</h2>
                <div id="divSAPreview">
                </div>
            </div>
        </div>
        <!-- Preview tab -->
        <div id="tabs-2">
            <div class="divClearForm">
                <a href="QlikView-SetAnalysis_Wizard_and_Generator.aspx" class="aClearForm">Reset Wizard</a>
            </div>

            <!-- Output of the Set Analysis statement -->
            <h2>
                Generated Set Analysis Expression (+Comments)</h2>
            <div style="width: 900px;">
                <div class="custom-checkbox" style="float:left;">
                    <input type="checkbox" id="chkSaveResultOnServer" /><label for="chkSaveResultOnServer" id="lblchkSaveResultOnServer">Save result for later usage or sharing</label>
                </div>

                <div style="float: right">
                    <a href="javascript:void(0);" disabled="disabled" id="lnkShare">Share Expression</a>
                    &nbsp;&nbsp;
                    <a href="javascript:void(0);" id="lnkSelectAll">Select All</a>
                </div>
                <br class="clearall" />
                <textarea id="txtOutput" wrap="off"></textarea>
            </div>
        </div>
        <!-- Examples tab -->
        <div id="tabs-3">
            <h2>
                Examples</h2>
            <br class="clearall" />
            <div id="divExamplesContainer" style="height:800px;">
                <div id="divExamplesNav" class="floatLeft" style="width: 300px;height:150px;">
                    <div id="accordion" style="width: 280px;">
                       
                        <h3>
                            <a href="#">Basic Examples without modifiers</a></h3>
                        <div>
                            <ul style="padding-left:20px;margin-top:0px;">
                                <li><a href="Set-Analysis-Example--Simple-Expressions.aspx" onclick="javascript:loadEx(this.href);return false;">
                                    Simple Expressions</a>
                                </li>
                                <li><a href="Set-Analysis-Example--Simple-Expressions-Bookmarks.aspx" onclick="javascript:loadEx(this.href);return false;">
                                    Using Bookmarks</a>
                                </li>
                            </ul>
                        </div>
                        <h3>
                            <a href="#">Simple Modifiers</a></h3>
                        <div>
                            <ul style="padding-left: 20px; margin-top: 0px;">
                                <li><a href="Set-Analysis-Example--Some-Basic-Modifiers.aspx" onclick="javascript:loadEx(this.href);return false;">
                                    Basic Set Modifiers</a> </li>
                                <li><a href="Set-Analysis-Example--Some-Basic-Modifiers-Ad-Hoc-Expressions.aspx"
                                    onclick="javascript:loadEx(this.href);return false;">Using Ad-Hoc Expressions</a><br />
                                </li>
                                <li><a href="Set-Analysis-Example--Some-Basic-Modifiers-Search-Expressions.aspx"
                                    onclick="javascript:loadEx(this.href);return false;">Using Search Expressions</a><br />
                                </li>
                            </ul>
                            
                            
                        </div>
                        <h3>
                            <a href="#">Indirect Set Analysis</a></h3>
                        <div>
                            <ul style="padding-left: 20px; margin-top: 0px;">
                                <li><a href="Set-Analysis-Example--Indirect-Set-Analysis.aspx" onclick="javascript:loadEx(this.href);return false;">
                                    Indirect Set Analysis Examples</a><br />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- (accordion) -->
                </div>
                <!-- (divExamplesNav) -->
                <!-- (accordion)-->
                <div id="divExampleContentContainer" style="width: 100%;">
                    <div id="divExampleContent">
                    </div>
                </div>
            </div>
            <br class="clearall" />
        </div>
        <!-- Help tab -->
        <div id="tabs-4">
            <h2>
                Help</h2>

                <!-- ***************************************************************************** -->
                <ul  style="margin-left:50px;">
                    <li><a href="#Help_Feedback">Feedback</a></li>
                    <li><a href="#Help_KnownIssues">Known Issues</a></li>
                    <li><a href="#Help_ChangeLog">Change Log</a></li>
                </ul>

            <!-- ***************************************************************************** -->
            <a name="Help_Feedback"></a>
            <h3>Feedback</h3>
            <p>
                Are there any scenarios you cannot cover with this wizard?<br />
                Please <a href="http://www.qlikblog.at/1384/set-analysis-wizard-qlikview/#comments">
                    tell me that and drop me a line</a>!<br />
                <br />
                Please post any questions, bugs and especially ideas how to improve the "Set Analysis Wizard for QlikView"
                <a href="http://www.qlikblog.at/1384/set-analysis-wizard-qlikview/#comments">following
                    this link</a>.
            </p>

            
            

            <!-- ***************************************************************************** -->
            <a name="Help_KnownIssues"></a>
            <h3>Known Issues</h3>
            <ul>
                <li style="padding-bottom:0.8em;">There are <b>some combinations</b> which are <b>not caught</b>, yet.<br />
                For example: using the field operator "greater than" and using "A,B,C" as value would result in the expression <code style="background-color:#ffffff;white-space:nowrap;">Sum({$&lt;TargetField={"&gt;A","&gt;B","&gt;C"}&gt;}Sales)</code>, which does not make sense.
                </li>
                <li style="padding-bottom:0.8em;">
                There is <b>no validation</b> implemented at the moment, so you are not forced to fill in all required fields.
                </li>
                <li style="padding-bottom:0.8em;">
                <b>Alternate States</b> of QlikView 11 are not supported, yet. But I am working on that :)
                </li>
            </ul>

            <!-- ***************************************************************************** -->
            <a name="Help_ChangeLog"></a>
            <h3>Change Log</h3>

            <table border="0" style="padding:3px;width:100%;">
                <tr>
                    <th style="text-align:left;width:80px;">Version</th>
                    <th style="text-align:left;">Description</th>
                    <th style="text-align:left;width:80px;">Date</th>
                </tr>
                <tr>
                    <td class="odd">0.5.1</td>
                    <td class="odd">
                    <b>New</b><br />
                    <ul style="margin-left:0px;padding-left:0px;list-style-type:circle;">
                        <li>Added the ability that each Set Modifier Action will be highlighted when hovering over the row of an action in the first tab.</li>
                    </ul>
                    </td>
                    <td class="odd">
                    04-12-2011
                    </td>
                </tr>
                <tr>
                    <td class="even">0.5</td>
                    <td class="even"><ul style="margin-left:0px;padding-left:0px;list-style-type:circle;"><li>Initial version</li></ul></td>
                    <td class="even">03-12-2011</td>                    
                </tr>
            </table>

        </div>
        <!-- Debug Tab -->
        <div id="tabs-6">
            <div>
                <h2>
                    Debug</h2>
                <hr />
                <input type="button" id="cmdDebugClearForm" value="Clear Form" />
                <hr />
                <input type="button" id="cmdGetDebugOutput" value="Get Debug Output" />
                <br clear="all" />
                <textarea id="txtDebugOutput" style="width: 950px; height: 300px;" rows="100" cols="200"></textarea>
            </div>
        </div>

    </div>
    </div>

    <div id="pageAd" style="position:absolute;top:70px;left:1080px;">
    <script type="text/javascript"><!--
        google_ad_client = "ca-pub-7992557440468236";
        /* tools.qlikblog.at */
        google_ad_slot = "6118424656";
        google_ad_width = 160;
        google_ad_height = 600;
    //-->
    </script>
    <script type="text/javascript"
    src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
    </script>
    </div>

<div id="divLoading" style="width:1000px;height:600px;background-color:#eeeeee;display:table;opacity:0.8;">
    <div style="text-align:center;display:table-cell;vertical-align:middle;">
    <img src="library/spinner/ajax-loader.gif" alt="Loading the Set Analysis Wizard for QlikView" border="0" valign="middle" />
    <div style="margin-top:5px;">
    Loading Set Analysis Wizard ...
    </div>
    </div>
</div>



    <!-- Set Modifier Row - Master -->
    <div class="hidden">
        <!-- this will be copied -->
        <div id="divSetModifier" class="clsSetModifier">
            <div class="lblSetModifierLabel" style="display:table-cell;width:99%;"></div>
            <div style="display:table-cell;width:20px;vertical-align:middle;">
            <a href="javascript:void(0);" title="Hightlight this set modifier in the preview pane below" class="setModifier_HighlightButton" style="cursor:help;"><img src="library/icons/highlight.gif" alt="Highlight Set Modifier" class="iconbutton" border="0" /></a>
            </div>
            <div style="display:table-cell;width:20px;vertical-align:middle;">
            <a href="javascript:void(0);" title="Change this set modifier" class="setModifier_EditButton"><img src="library/icons/application_form_edit.png" alt="Change this set modifier" class="iconbutton" border="0" /></a>
            </div>
            <div style="display:table-cell;width:20px;vertical-align:middle;">
            <a href="javascript:void(0);" title="Delete this set modifier" class="setModifier_DeleteButton"><img src="library/icons/delete.png" alt="Delete this set modifier" class="iconbutton" border="0" /></a>
            </div>
        </div>
    </div>
    
    <!-- Action Dialog -->
    <div id="divActionDialog" class="hidden" title="Define the Set Modifier">
        
        <p>
        In the form below you can select an action and define the required parameters for the selected action.<br />
        After clicking on "Save" the action will be added to the Set Analysis expression.
        </p>

        <h3>What would you like to do?</h3>
        <div id="divSetModifierAction">
            <div style="padding-left: 20px;">
                <select id="cboSetModifierAction" class="af_clearable">
                    <optgroup label="Standard Set Modifiers">
                        <option value="set_remove">Remove selection in field</option>
                        <option value="set_modify_by_value">Modify the set explicitely by defining values</option>
                        <option value="set_modify_by_expression">Modify the set by using expressions</option>
                    </optgroup>
                    <optgroup label="Indirect Set Analysis (using explicit values)">
                        <option value="set_pindirect">Select values based on selections (by value) in another field</option>
                        <option value="set_eindirect">Select values based on INVERSE selection (by value) in another field</option>
                    </optgroup>
                    <optgroup label="Indirect Set Analysis (using expressions)">
                        <option value="set_pindirect_exp">Select values based on selections (by expression) in another field</option>
                        <option value="set_eindirect_exp">Select values based on INVERSE selection (by expression) in another field</option>
                    </optgroup>
                </select>
                <a href="javascript:void(0);" class="qtippable" title="<b>Select one of the predefined actions:</b><br/><br/>Depending on the selected action you'll be able to set the desired parameters." tabindex="10000">
                <span class="ui-icon ui-icon-info" style="display: inline-block; margin-right: .3em;cursor:help;">
                </span></a>
            </div>
            <hr />
        </div>
               
       
        <div id="set_values">
            <h3 style="margin-bottom:5px;">Field</h3>
            <div id="divActionForm_Field">
                <div style="padding-left: 20px;">
                    <!-- Field Operator-->
                    <div id="div_sm_fieldoperator" style="display: inline-block;">
                        <div class="above">
                            <label for="sm_fieldoperator">Mode:</label>
                        </div>
                        <div>
                            <select id="sm_fieldoperator">
                                <option value="=">Select Values Explicitely (=)</option>
                                <option value="+=">Additionally Select Values (+=)</option>
                                <option value="-=">Exclude Values (-=)</option>
                                <option value="*=">Select with Positive Intersection (*=)</option>
                                <option value="/=">Select with Negative Intersection (/=)</option>
                            </select>
                        </div>
                    </div>

                    <div id="div_sm_fieldoperator_in">
                        in
                    </div>
                    
                    <!-- Field -->
                    <div id="div_sm_field" style="display: inline-block;">
                        <div class="above">
                            <label for="sm_field">Target Field:</label>
                        </div>
                        <div>
                            <input type="text" id="sm_field" style="width:150px;" class="af_clearable" />
                            <a href="javascript:void(0);" title="<b>Target Field name:</b><br/>Enter the desiered field name.<br/><br/>If the field name contains spaces, also just enter the field name as it is, the brackets ( [ and ] ) will be added automatically!"
                                class="qtippable" tabindex="10000"><span class="ui-icon ui-icon-info" style="display: inline-block;
                                    margin-right: .3em; cursor: help;"></span></a>
                        </div>
                    </div>
                    
                </div>
                <hr />
            </div>

            
            <div id="divActionForm_Condition" style="margin-top:0px;">
            <h3 style="margin-bottom:5px;">Condition:</h3>
                <div style="padding-left: 20px;">
                    <!-- Other Field -->
                    <div id="div_sm_otherfield">
                        <div class="above">
                            <label for="sm_otherfield">"Other Field":</label>
                        </div>
                        <div>
                        <input type="text" id="sm_otherfield" style="width:100px;" class="af_clearable" />
                        <a href="javascript:void(0);" class="qtippable" tabindex="10000" title="<b>Condition based on field ...</b><br/><br/>">
                            <span class="ui-icon ui-icon-info" style="display: inline-block;
                                    margin-right: .3em; cursor: help;"></span>
                        </a>
                        </div>
                    </div>
                    <div id="div_sm_selectionoperator" style="display: inline-block;">
                        <div class="above">
                        <label for="cboSelectionOperator">Operator:</label>
                        </div>
                        <select id="cboSelectionOperator" class="af_clearable">
                            <option value="equal_to">equal to</option>
                            <!--<option value="not_equal_to">not equal to</option>-->
                            <option value="greater_than">greater than</option>
                            <option value="less_than">less than</option>
                            <option value="greater_than_or_equal">greater than or equal to</option>
                            <option value="less_than_or_equal">less than or equal to</option>
                            <option value="contains">contains</option>
                            <option value="startswith">starts with</option>
                            <option value="endswith">ends with</option>
                            <optgroup label="between">
                                <option value="between_gt_lt">between (&gt; val1 &lt; val2)</option>
                                <option value="between_gt=_lt">between (&gt;= val1 &lt; val2)</option>
                                <option value="between_gt=_lt=">between (&gt;= val1 &lt;= val2)</option>
                                <option value="between_gt_lt=">between (&gt; val1 &lt;= val2)</option>
                            </optgroup>
                        </select>
                        <a href="javascript:void(0);" class="qtippable" tabindex="10000" title="Select one of the <b>predefined operators.</b><br /><br />Depending on the selected operator you'll have to define additional parameters like:<br /><br />Operator 'equal to' =&gt; define the value<br />Operator 'between value1 and value2' =&gt; define value1 and value2">
                                <span class="ui-icon ui-icon-info" style="display: inline-block; margin-right: .3em;cursor:help;">
                            </span></a>
                    </div>
                    <div id="div_sm_value_1" style="display: inline-block;">
                        <div class="above">
                            <label for="sm_value_1"><span class="lblValueExpression">Value</span>:</label>
                        </div>
                        <div>
                            <input type="text" id="sm_value_1" style="width: 150px;" class="af_clearable" />
                            <a id="tipExpression_1" href="javascript:void(0);" class="qtippable" title="<b>Expression</b><br/>Enter your expression here as you would define it in QlikView (e.g. max(Year)).<br/><br/>You do not need to add the $(=) for an ad-hoc expression, this will be added automatically.<br/><br/><b>Examples</b><br/><ul><li>max(Year)</li><li>max(Year)-1</li></ul>" tabindex="10000">
                                <span class="ui-icon ui-icon-info" style="display: inline-block; margin-right: .3em; cursor: help;"></span>
                            </a>
                            <a id="tipValue_1" href="javascript:void(0);" class="qtippable" title="<b>Enter value(s):</b><br />Enter one or more values here.<br /><b>Multiple values</b> are just seperated by a comma (,).<br /><br />Do not distinguish between numeric and string values, this will be done automatically by the wizard.<br /><br /><b>Examples:</b><br/><ul><li>2008</li><li>2008,2009</li><li>Southern,Western,Eastern</li></ul>" tabindex="10000">
                                <span class="ui-icon ui-icon-info" style="display: inline-block; margin-right: .3em; cursor: help;"></span>
                            </a>
                        </div>
                    </div>

                    <div id="div_sm_value_and">
                    and
                    </div>

                    <div id="div_sm_value_2" style="display: inline-block;">
                        <div class="above">
                            <label for="sm_value_2"><span class="lblValueExpression">Value</span>:</label>
                        </div>
                        <div>
                            <input type="text" id="sm_value_2" style="width:150px;" class="af_clearable" />
                            
                            <a id="tipExpression_2" href="javascript:void(0);" class="qtippable" title="<b>Expression</b><br/>Enter your expression here as you would define it in QlikView (e.g. max(Year)).<br/><br/>You do not need to add the $(=) for an ad-hoc expression, this will be added automatically.<br/><br/><b>Examples</b><br/><ul><li>max(Year)</li><li>max(Year)-1</li></ul>" tabindex="10000">
                                <span class="ui-icon ui-icon-info" style="display: inline-block; margin-right: .3em; cursor: help;"></span>
                            </a>
                            <a id="tipValue_2" href="javascript:void(0);" class="qtippable" title="<b>Enter value(s):</b><br />Enter one or more values here.<br /><b>Multiple values</b> are just seperated by a comma (,).<br /><br />Do not distinguish between numeric and string values, this will be done automatically by the wizard.<br /><br /><b>Examples:</b><br/><ul><li>2008</li><li>2008,2009</li><li>Southern,Western,Eastern</li></ul>" tabindex="10000">
                                <span class="ui-icon ui-icon-info" style="display: inline-block; margin-right: .3em; cursor: help;"></span>
                            </a>
                        </div>
                    </div>
                   
                </div>
                <div style="padding-left: 20px; margin-left: 138px;">
                    <div id="div_sm_indirectfield" style="display: inline-block;">
                        <div class="above">
                            <label for="sm_indirectfield">
                                Indirect Selection for Field:</label>
                        </div>
                        <div>
                            <input type="text" id="sm_indirectfield" style="width: 150px;" class="af_clearable" />
                            <a id="tipIndirectField" href="javascript:void(0);" class="qtippable" title="<b>Indirect Selection for Field:</b><br/><br/>"
                                tabindex="10000"><span class="ui-icon ui-icon-info" style="display: inline-block;
                                    margin-right: .3em; cursor: help;"></span></a>

                            <a href="javascript:void(0);" id="aCopyOtherField">Same as "Target Field"</a>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            
            <!-- Values -->
            <h3>Preview:</h3>
            <div id="spanActionPreviewDescription" style="font-family:Courier New;">
            </div>
        
        </div>
    
    </div> <!-- (divActionFormDialog) -->

    <!-- Header -->
    <div id="divHeader">
        <div id="divBack">
            <a href="http://www.qlikblog.at">back to qlikblog.at</a>
        </div>
        
    </div>

    <!-- Share Dialog -->
    <div id="divShareDialog" class="hidden" title="Share the Set Analysis Expression">
        <div>
        <p>
        <b>You are welcome to share the Set Analysis Expression with others by using the following link.</b><br />
        (Just send this link to others, post it in discussions forums, etc.)<br />
        </p>
        <input type="text" id="txtShareLink" style="width:500px;" />
        </div>
    </div>

    <!-- Error Dialog -->
    <div id="divErrorDialog" class="hidden" title="An error occured ...">
        <table cellpadding="10">
            <tr>
                <td valign="middle"><img src="library/icons/dialog_error_32x32.png" alt="Error"/></td>
                <td>
                <div id="divErrorMsg"></div>
                </td>
            </tr>
        </table>
    </div>

    <!-- Block UI -->
    <div id="domMessage" class="hidden">     
        <h1 id="domMessage_H1"></h1>
    </div>

    <!-- QlikView Version -->
    <div id="divQVVersion" class="hidden">
    <select id="cboQVVersion">
        <option value="100000" title="All QlikView versions">All versions</option>
        <option value="8500" title="Use the features of QlikView 11">QlikView 8.5</option>
        <option value="9000" title="Use the features of QlikView 9">QlikView 9.0</option>
        <option value="1000" title="Use the features of QlikView 10">QlikView 10</option>
        <option value="1100" disabled="disabled" title="Disabled until 11.11.2011">QlikView 11</option>
    </select>
        <a href="javascript:void(0);" class="qtippable" title="<b>Select the compatibility mode.</b><br/><br/>By default you'll see all options, but you can restrict to see for example only the Set Analysis functionality available in QlikView 9.">
            <span class="ui-icon ui-icon-info qtippable"" style="display: inline-block; margin-right: .3em;cursor:help;"></span>
        </a>
    </div>

    <div id="divChangeLog" class="hidden" title="ChangeLog of Set Analysis Wizard for QlikView">
        <div id="divChangeLogDetails">
        </div>        
    </div>

    <!-- Beta Badge -->
    <div id="divBetaBadge">
        <img src="library/images/Beta_Badge.png" title="Set Analysis Wizard for QlikView is in beta stadium ..." border="0" alt="Set Analysis Wizard for QlikView is in beta stadium ..." />
    </div>

    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-10699050-1']);
        _gaq.push(['_trackPageview']);

        (function () {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        }
        )();
    </script>


</asp:Content>
