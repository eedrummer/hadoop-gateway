package org.projecthquery.js;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

public class JavaScriptManagerTest {

    private JavaScriptManager jsm;
    
    @Before
    public void setUp() throws Exception {
        String filename = "foo.js";
        String source = "function add(x,y) {return x + y};";
        JavaScriptSource jss = new JavaScriptSource(filename, source);
        List<JavaScriptSource> sourceList = new ArrayList<JavaScriptSource>();
        sourceList.add(jss);
        jsm = new JavaScriptManager(sourceList);
    }

    @Test
    public void testEvaluate() {
        double result = (Double) jsm.evaluate("add(1,2);");
        assertTrue(result == 3);
    }

}
