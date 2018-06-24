package jautil;

import java.util.Collection;
import java.util.Comparator;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

public class MapInt<E> {
	private static final MapInt.Int.Comp INT_COMP = new MapInt.Int.Comp();

	public static final MapInt.Int.Comp getIntComp() {
		return INT_COMP;
	}

	private Map<Int, E> map;

	private transient Int key;

	public MapInt(Map<Int, E> mp) {
		this.map = mp;
		this.key = new Int();
	}

	public MapInt() {
		this(new TreeMap(INT_COMP));
	}

	public void setMap(Map<Int, E> mp) {
		this.map = mp;
	}

	public void clear() {
		this.map.clear();
	}

	public int size() {
		return this.map.size();
	}

	public void put(int k, E val) {
		this.map.put(new Int(k), val);
	}

	public void getValues(E[] values) {
		this.map.values().toArray(values);
	}

	public E get(int k) {
		this.key.setIntValue(k);
		return (E) this.map.get(this.key);
	}

	public int[] keys() {
		Set<Int> kobjs = this.map.keySet();
		int[] kvals = new int[kobjs.size()];

		int i = 0;
		for (Int kobj : kobjs) {
			kvals[i] = kobj.intValue();
			i++;
		}

		return kvals;
	}

	public static class Int {
		private int val;

		public Int() {
			this(-1);
		}

		public Int(int val) {
			setIntValue(val);
		}

		public void setIntValue(int val) {
			this.val = val;
		}

		public int intValue() {
			return this.val;
		}

		public int hashCode() {
			return this.val;
		}

		public boolean equals(Object obj) {
			if ((obj instanceof Int)) {
			}

			return intValue() == ((Int) obj).intValue();
		}

		public static class Comp implements Comparator<MapInt.Int> {
			public int compare(MapInt.Int i0, MapInt.Int i1) {
				return i0.intValue() - i1.intValue();
			}
		}
	}
}
