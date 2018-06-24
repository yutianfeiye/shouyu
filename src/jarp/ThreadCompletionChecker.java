package jarp;

public abstract interface ThreadCompletionChecker {
	public abstract void waitForCompletion() throws InterruptedException;
}
