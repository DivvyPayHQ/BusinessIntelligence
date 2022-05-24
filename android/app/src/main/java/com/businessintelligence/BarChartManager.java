package com.businessintelligence;
import android.graphics.Color;
import java.util.ArrayList;
import com.facebook.react.uimanager.SimpleViewManager;
import java.util.List;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.github.mikephil.charting.animation.Easing;
import com.github.mikephil.charting.charts.BarChart;
import com.github.mikephil.charting.charts.Chart;
import com.github.mikephil.charting.data.BarData;
import com.github.mikephil.charting.data.BarDataSet;
import com.github.mikephil.charting.data.BarEntry;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.interfaces.datasets.IBarDataSet;


public class BarChartManager extends SimpleViewManager<BarChart> {

    @Override
    public String getName() {
        return "BarChartModule";
    }

    @Override
    protected BarChart createViewInstance(ThemedReactContext reactContext) {
        BarChart chart = new BarChart(reactContext);
        chart.getLegend().setEnabled(false); // hides legend
        chart.getDescription().setEnabled(false);
        chart.setDrawGridBackground(false); // shows a color background to chart
        chart.setDrawBarShadow(false); // sets the top of the bar to gray
//        chart.animateY(1500, Easing.EaseInBounce); // animates from bottom up

        chart.invalidate(); //refresh the data
         return chart;
    }

        @ReactProp(name = "xAxis")
        public void setXAxis(Chart chart, ReadableArray readableArray) {
            List<String> labels = new ArrayList<String>();
            for (int index = 0; index < readableArray.size(); index++) {
                String val = readableArray.getString(index);
                labels.add(val);
            }
            XAxis xAxis = chart.getXAxis();
            xAxis.setPosition(XAxis.XAxisPosition.BOTTOM);
            xAxis.setDrawGridLines(false);
            xAxis.setGranularity(1f);
            xAxis.setLabelRotationAngle(-20);
            xAxis.setTextSize(12);
            xAxis.setLabelCount(7);
            xAxis.setValueFormatter(new com.github.mikephil.charting.formatter.IndexAxisValueFormatter(labels));
            chart.invalidate();
        };
        @ReactProp(name = "yAxis")
        public void setYAxis(Chart chart, ReadableArray readableArray) {
            BarChart barChart = (BarChart) chart;
            barChart.getAxisLeft().setDrawGridLines(false);
            YAxis axisLeft = barChart.getAxisLeft();
            axisLeft.setGranularity(10f);
            axisLeft.setAxisMinimum(0);
            axisLeft.setDrawGridLines(false);
            axisLeft.setDrawAxisLine(false);
            axisLeft.setDrawLabels(false);

            YAxis axisRight = barChart.getAxisRight();
            axisRight.setDrawAxisLine(false);
            axisRight.setDrawLabels(false);
            axisRight.setDrawGridLines(false);
            axisRight.setGranularity(5f);
            axisRight.setAxisMinimum(0);
            ArrayList<BarEntry> values = new ArrayList<>();
            for (int index = 0; index < readableArray.size(); index++) {
                float x = index;
                double y = readableArray.getDouble(index);
                values.add(new BarEntry(x, (float) y));
            }
            BarDataSet set1 = new BarDataSet(values, "Top 5 Companies");
            int DivvyGreen = Color.parseColor("#16a06d");
            int DivvyDarkBlue = Color.parseColor("#3D426B");
            set1.setColors(new int[] {DivvyDarkBlue, DivvyGreen });

            ArrayList<IBarDataSet> dataSets = new ArrayList<>();
            dataSets.add(set1);

            BarData data = new BarData(dataSets);
            data.setValueTextSize(12f);
            chart.setTouchEnabled(false);
            chart.setData(data);
            chart.animateY(1000, Easing.EaseOutBack);
            chart.invalidate();
        };
}