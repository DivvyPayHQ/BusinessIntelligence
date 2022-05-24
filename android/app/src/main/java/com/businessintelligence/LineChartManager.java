package com.businessintelligence;
import android.graphics.Color;
import java.util.ArrayList;
import com.facebook.react.uimanager.SimpleViewManager;
import java.util.List;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.github.mikephil.charting.animation.Easing;
import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.charts.Chart;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;


public class LineChartManager extends SimpleViewManager<LineChart> {

    @Override
    public String getName() {
        return "LineChartModule";
    }

    @Override
    protected LineChart createViewInstance(ThemedReactContext reactContext) {
        LineChart chart = new LineChart(reactContext);
        chart.getLegend().setEnabled(false); // hides legend
        chart.getDescription().setEnabled(false);
        chart.setDrawGridBackground(false); // shows a color background to chart
        chart.animateY(1000, Easing.Linear);
        chart.setAutoScaleMinMaxEnabled(true);

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
        xAxis.setGranularityEnabled(true);
        xAxis.setGranularity(1f);
        xAxis.setSpaceMax(0.5f);
        xAxis.setDrawAxisLine(false);
        xAxis.setSpaceMin(0.5f);
        xAxis.setLabelCount(6);
        xAxis.setValueFormatter(new com.github.mikephil.charting.formatter.IndexAxisValueFormatter(labels));
        chart.invalidate();
    };
    @ReactProp(name = "yAxis")
    public void setYAxis(Chart chart, ReadableArray readableArray) {
        int DivvyGreen = Color.parseColor("#16a06d");
        int DivvyBlue = Color.parseColor("#B4D9Ef");
        int DivvyDarkBlue = Color.parseColor("#3D426B");

        LineChart lineChart = (LineChart) chart;
        lineChart.getAxisLeft().setDrawGridLines(false);
        YAxis axisLeft = lineChart.getAxisLeft();
        axisLeft.setGranularity(10f);
        axisLeft.setDrawGridLines(false);
        axisLeft.setAxisMinimum(0);
        axisLeft.setDrawAxisLine(false);
        axisLeft.setDrawLabels(false);

        YAxis axisRight = lineChart.getAxisRight();
        axisRight.setDrawAxisLine(false);
        axisRight.setDrawLabels(false);
        axisRight.setDrawGridLines(false);
        axisRight.setAxisMinimum(0);
        List<Entry> values = new ArrayList<>();
        for (int index = 0; index < readableArray.size(); index++) {
            float x = index;
            double y = readableArray.getDouble(index);
            values.add(new Entry(x, (float) y));
        }
        LineDataSet set1 = new LineDataSet(values, "Top 5 Companies");
        set1.setMode(LineDataSet.Mode.HORIZONTAL_BEZIER);
        set1.setLineWidth(4f);
        set1.setFillAlpha(65);
        set1.setFillColor(DivvyBlue);
        set1.setCircleColor(DivvyGreen);
        set1.setCircleHoleColor(Color.WHITE);
        set1.setDrawValues(true);
        set1.setCircleHoleRadius(3f);
        set1.setDrawCircleHole(true);
        set1.setCircleRadius(6f);
        set1.setFillAlpha(100);
        set1.setDrawFilled(true);
        set1.setFillColor(DivvyBlue);
        set1.setColor(DivvyDarkBlue);

        List<ILineDataSet> dataSets = new ArrayList<>();
        dataSets.add(set1);

        LineData data = new LineData(dataSets);
        data.setValueTextSize(12f);
        chart.setTouchEnabled(false);
        chart.setData(data);
        chart.invalidate();
    };
}