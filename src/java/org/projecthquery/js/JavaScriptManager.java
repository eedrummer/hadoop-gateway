package org.projecthquery.js;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

public class JavaScriptManager {
    private Context context;
    private Scriptable scope;

    public JavaScriptManager(List<JavaScriptSource> scripts,Map <String,Object>contextObjects) {
        context = Context.enter();
        scope = context.initStandardObjects();
        setContextObjects(contextObjects);

    }
    
    public Object evaluate(String javaScript, Map <String,Object>contextObjects) {
        setContextObjects(contextObjects);
        return context.evaluateString(scope, javaScript, "temporary", 1,null);
    }

    public void destroy() {
        Context.exit();
    }
    public Context getContext(){
        return this.context;
    }
    
    public Scriptable getScope(){
        return this.scope;
    }
    
    public Object getFunction(String name){
        return scope.get(name, scope);
    }
    private void setContextObjects( Map <String,Object>contextObjects){
        if(contextObjects != null){
            for (Iterator iterator = contextObjects.keySet().iterator(); iterator.hasNext();) {
            String key = (String) iterator.next();
            scope.put(key,scope, contextObjects.get(key));
        }
        }
    }
}
