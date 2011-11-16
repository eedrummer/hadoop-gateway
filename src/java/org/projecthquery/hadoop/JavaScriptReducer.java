package org.projecthquery.hadoop;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.mapreduce.Reducer;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.Scriptable;
import org.projecthquery.js.JavaScriptManager;
import org.projecthquery.js.JavaScriptSource;
import org.projecthquery.js.TypeConverter;

public class JavaScriptReducer extends Reducer<Writable, Writable, Writable, Writable> {
    private JavaScriptManager jsMan;
    @Override
    public void reduce(Writable key, Iterable<Writable> values,
            Context context) throws IOException, InterruptedException {
        
        Function red = (Function)jsMan.getFunction("reduce");
        Scriptable scope = jsMan.getScope();
        org.mozilla.javascript.Context jsCtx = jsMan.getContext();
        Object v = red.call(jsCtx, scope, scope, new Object[]{key,values});
        context.write(key, TypeConverter.convert(v));
    }

    @Override
    protected void setup(org.apache.hadoop.mapreduce.Reducer.Context context)
            throws IOException, InterruptedException {
        // TODO Auto-generated method stub
        super.setup(context);
        
        Configuration conf = context.getConfiguration();
        List<JavaScriptSource> js = new ArrayList<JavaScriptSource>();
        js.add(new JavaScriptSource("reduce.js", conf.get("reduce_js")));
        js.add(new JavaScriptSource("functions.js", conf.get("functions_js")));
        js.add(new JavaScriptSource("emit.js", "function emit(k,v){_mapper.emit(k,v,_hadoop_context)"));
        
        Map<String,Object> cos = new HashMap<String,Object>();
        cos.put("_hadoop_context", context);
        cos.put("_reducer", this);
        
        jsMan = new JavaScriptManager(js,cos);
        
    }


}