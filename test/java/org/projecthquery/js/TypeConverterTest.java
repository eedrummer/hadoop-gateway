package org.projecthquery.js;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.apache.hadoop.io.ArrayWritable;
import org.apache.hadoop.io.BooleanWritable;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.MapWritable;
import org.apache.hadoop.io.Text;
import org.junit.Before;
import org.junit.Test;

public class TypeConverterTest {
    private JavaScriptManager jsm;
    
    @Before
    public void setUp() throws Exception {
        List<JavaScriptSource> sourceList = new ArrayList<JavaScriptSource>();
        jsm = new JavaScriptManager(sourceList);
    }

    @Test
    public void testDoubleConversion() {
        Object result = jsm.evaluate("1");
        DoubleWritable dw = (DoubleWritable) TypeConverter.convert(result);
        assertTrue(1 == dw.get());
    }

    @Test
    public void testStringConversion() {
        Object result = jsm.evaluate("'hello'");
        Text text = (Text) TypeConverter.convert(result);
        assertTrue("hello".equals(text.toString()));
    }
    
    @Test
    public void testArrayConversion() {
        Object result = jsm.evaluate("[1, 2, 3]");
        ArrayWritable aw = (ArrayWritable) TypeConverter.convert(result);
        assertTrue(1 == ((DoubleWritable) aw.get()[0]).get());
    }
    
    @Test
    public void testMapConversion() {
        Object result = jsm.evaluate("var baz = {\"foo\": \"bar\"}; baz;");
        MapWritable mw = (MapWritable) TypeConverter.convert(result);
        assertTrue("bar".equals(((Text) mw.get(new Text("foo"))).toString()));
    }
    
    @Test
    public void testBooleanConversion() {
        Object result = jsm.evaluate("true");
        BooleanWritable bw = (BooleanWritable) TypeConverter.convert(result);
        assertTrue(bw.get());
    }    
}
