package org.projecthquery.js;

import java.util.Iterator;
import java.util.List;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;
import org.mozilla.javascript.json.JsonParser;
import org.mozilla.javascript.json.JsonParser.ParseException;

public class JavaScriptManager {
    private Context context;
    private Scriptable scope;

    public JavaScriptManager(List<JavaScriptSource> scripts) {
        context = Context.enter();
        scope = context.initStandardObjects();
        
        for (Iterator<JavaScriptSource> i = scripts.iterator(); i.hasNext();) {
            JavaScriptSource javaScriptSource = i.next();
            context.evaluateString(scope, javaScriptSource.getSource(),
                                   javaScriptSource.getFileName(), 1, null);
            
        }
    }
    
    public Object evaluate(String javaScript) {
        return context.evaluateString(scope, javaScript, "temporary", 1,null);
    }
    
    public void destroy() {
        Context.exit();
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
