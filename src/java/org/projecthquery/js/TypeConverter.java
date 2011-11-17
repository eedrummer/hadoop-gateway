package org.projecthquery.js;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map.Entry;

import org.apache.hadoop.io.ArrayWritable;
import org.apache.hadoop.io.BooleanWritable;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.FloatWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.MapWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.Writable;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.NativeObject;

public class TypeConverter {
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public static Writable convert(Object jsObject) {
        
        Writable convertedJSType = null;
        if(jsObject == null){
            return  NullWritable.get();
        }
        System.out.println("CONVERT :" + jsObject.getClass().getName() + "  "+jsObject.toString());
        if (jsObject.getClass().equals(Double.class)) {
            convertedJSType = new DoubleWritable((Double) jsObject);
        }
        if (jsObject.getClass().equals(Integer.class)) {
            convertedJSType = new IntWritable((Integer) jsObject);
        }
        if (jsObject.getClass().equals(Float.class)) {
            convertedJSType = new FloatWritable((Float) jsObject);
        }
        if (jsObject.getClass().equals(Long.class)) {
            convertedJSType = new LongWritable((Long) jsObject);
        }
       
        if (jsObject.getClass().equals(String.class)) {
            convertedJSType = new Text((String) jsObject);
        }
        if (jsObject.getClass().equals(Boolean.class)) {
            convertedJSType = new BooleanWritable((Boolean) jsObject);
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
        if (jsObject.getClass().equals(NativeObject.class)) {
            MapWritable mapWritable = new MapWritable();
            NativeObject nativeObject = (NativeObject) jsObject;
            for (Iterator iterator = nativeObject.entrySet().iterator(); iterator.hasNext();) {
                Entry<Object, Object> entry = (Entry<Object, Object>) iterator.next();
                mapWritable.put(convert(entry.getKey()), convert(entry.getValue()));
            }
            convertedJSType = mapWritable;
        }
        
        return convertedJSType;
    }
}
