//
//  LargeValueFormatter.swift
//  BusinessIntelligence
//
//  Created by Honz Williams on 4/21/22.
//

import Foundation
import Charts

open class LargeValueFormatter: NSObject, IAxisValueFormatter
{
    fileprivate static let MAX_LENGTH = 5
    
    /// Suffix to be appended after the values.
    ///
    /// **default**: suffix: ["", "k", "m", "b", "t"]
    @objc open var suffix = ["", "k", "m", "b", "t"]
    
    /// An appendix text to be added at the end of the formatted value.
    @objc open var appendix: String?
    
    public override init()
    {
        
    }
    
    @objc public init(appendix: String?)
    {
        self.appendix = appendix
    }
    
    fileprivate func format(value: Double) -> String
    {
        var sig = value
        var length = 0
        let maxLength = suffix.count - 1
        
        while sig >= 1000.0 && length < maxLength
        {
            sig /= 1000.0
            length += 1
        }
        
        var r = String(format: "%2.f", sig) + suffix[length]
        
        if appendix != nil
        {
            r += appendix!
        }
        
        return r
    }
    
    open func stringForValue(
        _ value: Double, axis: AxisBase?) -> String
    {
        let str = "$" + format(value: value)
        return str
    }
    
    open func stringForValue(
        _ value: Double,
        entry: ChartDataEntry,
        dataSetIndex: Int,
        viewPortHandler: ViewPortHandler?) -> String
    {
        return format(value: value)
    }
}
