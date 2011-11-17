package org.projecthquery.js;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;
import org.mozilla.javascript.json.JsonParser;
import org.mozilla.javascript.json.JsonParser.ParseException;

public class JavaScriptManager {
    private Context context;
    private Scriptable scope;

    public JavaScriptManager(List<JavaScriptSource> scripts,
            Map<String, Object> contextObjects) {
        context = Context.enter();
        scope = context.initStandardObjects();
        for (Iterator iterator = scripts.iterator(); iterator.hasNext();) {
            JavaScriptSource js = (JavaScriptSource) iterator
                    .next();
            System.out.println(js.toString());
            if(js.getSource() != null){
             context.evaluateString(scope, js.getSource() , js.getFileName(), 1  , null);
            }
        }
        setContextObjects(contextObjects);

    }

    public Object evaluate(String javaScript, Map<String, Object> contextObjects) {
        setContextObjects(contextObjects);
        return context.evaluateString(scope, javaScript, "temporary", 1, null);
    }

    public void destroy() {
        Context.exit();
    }

    public Context getContext() {
        return this.context;
    }

    public Scriptable getScope() {
        return this.scope;
    }

    public Object getFunction(String name) {
        return scope.get(name, scope);
    }

    private void setContextObjects(Map<String, Object> contextObjects) {
        if (contextObjects != null) {
            for (Iterator iterator = contextObjects.keySet().iterator(); iterator
                    .hasNext();) {
                String key = (String) iterator.next();
                scope.put(key, scope, contextObjects.get(key));
            }
        }
    }

    public Object parseJSON(String json) {
        JsonParser jsonParser = new JsonParser(context, scope);
        Object evaledObject = null;
        try {
            evaledObject = jsonParser.parseValue(json);
        } catch (ParseException e) {
            throw new RuntimeException("Couldn't parse provided JSON", e);
        }

        return evaledObject;
    }

    public void injectObject(String variableName, Object object) {
        Object wrappedObject = Context.javaToJS(object, scope);
        ScriptableObject.putProperty(scope, variableName, wrappedObject);

    }
}
