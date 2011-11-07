package org.projecthquery.js;

import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.Writable;

public class TypeConverter {
    public static Writable convert(Object jsObject) {
        Writable convertedJSType = null;
        
        if (jsObject.getClass().equals(Double.class)) {
            convertedJSType = new DoubleWritable((Double) jsObject);
        }
        if (jsObject.getClass().equals(String.class)) {
            convertedJSType = new Text((String) jsObject);
        }
        
        return convertedJSType;
    }
}
