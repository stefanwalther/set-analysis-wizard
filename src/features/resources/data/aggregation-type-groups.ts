import {IAggregationTypeGroup} from "../../../common/interfaces/IAggregationTypeGroup";

export const AGGREGATION_TYPE_GROUPS: IAggregationTypeGroup[] = [
  {
    "label": "Basis Aggregation Functions",
    "items": [{"key": "Sum", "label": "Sum"}, {"key": "Min", "label": "Min"}, {
      "key": "Max",
      "label": "Max"
    }, {"key": "Only", "label": "Only"}, {"key": "Mode", "label": "Mode"}, {
      "key": "FirstSortedValue",
      "label": "FirstSortedValue"
    }]
  }, {
    "label": "String Aggregation Functions",
    "items": [{"key": "MinString", "label": "MinString"}, {"key": "MaxString", "label": "MaxString"}, {
      "key": "Concat",
      "label": "Concat"
    }]
  }, {
    "label": "Counter Aggregation Functions",
    "items": [{"key": "Count", "label": "Count"}, {"key": "NumericCount", "label": "NumericCount"}, {
      "key": "TextCount",
      "label": "TextCount"
    }, {"key": "NullCount", "label": "NullCount"}, {"key": "MissingCount", "label": "MissingCount"}]
  }, {
    "label": "Statistical Aggregation Functions",
    "items": [{"key": "Avg", "label": "Avg"}, {"key": "stdev", "label": "stdev"}, {
      "key": "median",
      "label": "median"
    }, {"key": "fractile", "label": "fractile"}, {"key": "skew", "label": "skew"}, {
      "key": "kurtosis",
      "label": "kurtosis"
    }, {"key": "correl", "label": "correl"}, {"key": "sterr", "label": "sterr"}, {
      "key": "steyx",
      "label": "steyx"
    }, {"key": "linest_m", "label": "linest_m"}, {"key": "linest_b", "label": "linest_b"}, {
      "key": "linest_r2",
      "label": "linest_r2"
    }, {"key": "linest_sem", "label": "linest_sem"}, {"key": "linest_seb", "label": "linest_seb"}, {
      "key": "linest_sey",
      "label": "linest_sey"
    }, {"key": "linest_df", "label": "linest_df"}, {"key": "linest_f", "label": "linest_f"}, {
      "key": "linest_ssreg",
      "label": "linest_ssreg"
    }, {"key": "linest_ssresid", "label": "linest_ssresid"}]
  }, {
    "label": "Financial Aggregation Functions",
    "items": [{"key": "irr", "label": "irr"}, {"key": "xirr", "label": "xirr"}, {
      "key": "npv",
      "label": "npv"
    }, {"key": "xnpv", "label": "xnpv"}]
  }, {
    "label": "Statistical Test Functions",
    "items": [{"key": "chi2test_p", "label": "chi2test_p"}, {
      "key": "chi2test_df",
      "label": "chi2test_df"
    }, {"key": "chi2test_chi2", "label": "chi2test_chi2"}, {"key": "TTest_t", "label": "TTest_t"}, {
      "key": "TTest_df",
      "label": "TTest_df"
    }, {"key": "TTest_sig", "label": "TTest_sig"}, {"key": "TTest_dif", "label": "TTest_dif"}, {
      "key": "TTest_sterr",
      "label": "TTest_sterr"
    }, {"key": "TTest_conf", "label": "TTest_conf"}, {
      "key": "TTest_lower",
      "label": "TTest_lower"
    }, {"key": "TTest_upper", "label": "TTest_upper"}, {"key": "TTestw_t", "label": "TTestw_t"}, {
      "key": "TTestw_df",
      "label": "TTestw_df"
    }, {"key": "TTestw_sig", "label": "TTestw_sig"}, {"key": "TTestw_dif", "label": "TTestw_dif"}, {
      "key": "TTestw_sterr",
      "label": "TTestw_sterr"
    }, {"key": "TTestw_conf", "label": "TTestw_conf"}, {
      "key": "TTestw_lower",
      "label": "TTestw_lower"
    }, {"key": "TTestw_upper", "label": "TTestw_upper"}, {"key": "TTest1_t", "label": "TTest1_t"}, {
      "key": "TTest1_df",
      "label": "TTest1_df"
    }, {"key": "TTest1_sig", "label": "TTest1_sig"}, {"key": "TTest1_dif", "label": "TTest1_dif"}, {
      "key": "TTest1_sterr",
      "label": "TTest1_sterr"
    }, {"key": "TTest1_conf", "label": "TTest1_conf"}, {
      "key": "TTest1_lower",
      "label": "TTest1_lower"
    }, {"key": "TTest1_upper", "label": "TTest1_upper"}, {"key": "TTest1w_t", "label": "TTest1w_t"}, {
      "key": "TTest1w_df",
      "label": "TTest1w_df"
    }, {"key": "TTest1w_sig", "label": "TTest1w_sig"}, {
      "key": "TTest1w_dif",
      "label": "TTest1w_dif"
    }, {"key": "TTest1w_sterr", "label": "TTest1w_sterr"}, {
      "key": "TTest1w_conf",
      "label": "TTest1w_conf"
    }, {"key": "TTest1w_lower", "label": "TTest1w_lower"}, {
      "key": "TTest1w_upper",
      "label": "TTest1w_upper"
    }, {"key": "ZTest_z", "label": "ZTest_z"}, {"key": "ZTest_sig", "label": "ZTest_sig"}, {
      "key": "ZTest_dif",
      "label": "ZTest_dif"
    }, {"key": "ZTest_sterr", "label": "ZTest_sterr"}, {"key": "ZTest_conf", "label": "ZTest_conf"}, {
      "key": "ZTestw_z",
      "label": "ZTestw_z"
    }, {"key": "ZTestw_sig", "label": "ZTestw_sig"}, {"key": "ZTestw_dif", "label": "ZTestw_dif"}, {
      "key": "ZTestw_sterr",
      "label": "ZTestw_sterr"
    }, {"key": "ZTestw_conf", "label": "ZTestw_conf"}]
  }]
