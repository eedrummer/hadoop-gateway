package org.projecthquery.js;

import java.util.ArrayList;
import java.util.Iterator;

import org.apache.hadoop.io.ArrayWritable;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.Writable;
import org.mozilla.javascript.NativeArray;

public class TypeConverter {
    public static Writable convert(Object jsObject) {
        Writable convertedJSType = null;
        
        if (jsObject.getClass().equals(Double.class)) {
            convertedJSType = new DoubleWritable((Double) jsObject);
        }
        if (jsObject.getClass().equals(String.class)) {
            convertedJSType = new Text((String) jsObject);
        }
        if (jsObject.getClass().equals(NativeArray.class)) {
            NativeArray jsArray = (NativeArray) jsObject;
            ArrayList<Writable> writableArray = new ArrayList<Writable>();
            for (Iterator iterator = jsArray.iterator(); iterator.hasNext();) {
                Object object = iterator.next();
                writableArray.add(convert(object));
            }
            ArrayWritable aw = new ArrayWritable(writableArray.get(0).getClass());
            aw.set(writableArray.toArray(new Writable[]{}));
            convertedJSType = aw;
        }
        
        return convertedJSType;
    }
}
