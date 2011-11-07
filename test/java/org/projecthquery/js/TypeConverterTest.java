package org.projecthquery.js;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.apache.hadoop.io.DoubleWritable;
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
    public void testDoubleConversionm() {
        Object result = jsm.evaluate("1");
        DoubleWritable dw = (DoubleWritable) TypeConverter.convert(result);
        assertTrue(1 == dw.get());
    }

    @Test
    public void testStringConversionm() {
        Object result = jsm.evaluate("'hello'");
        Text text = (Text) TypeConverter.convert(result);
        assertTrue("hello".equals(text.toString()));
    }
}
