import concurrent.futures
import json
import math
import random
import sys
from functools import reduce

MeanSquareOfDisplacement = {
    'H2O': 6 * 27,
    'D2O': 6 * 120,
    'Be': 6 * 98,
    'BeO': 6 * 105,
    'C': 6 * 350,
}

DeceleratorConstants = [
    [18, MeanSquareOfDisplacement.get('H2O')],
    [20, MeanSquareOfDisplacement.get('D2O')],
    [4, MeanSquareOfDisplacement.get('Be')],
    [20, MeanSquareOfDisplacement.get('BeO')],
    [14, MeanSquareOfDisplacement.get('C')]
]


def next_normal_distributed_value(mean, standard_derivation):
    # Polar Box-Muller transformation.
    x = 2 * random.random() - 1.0
    y = 2 * random.random() - 1.0
    r = x ** 2 + y ** 2
    while r >= 1.0:
        x = 2 * random.random() - 1.0
        y = 2 * random.random() - 1.0
        r = x ** 2 + y ** 2
    z = math.sqrt(-2.0 * math.log(r) / r)
    return mean + standard_derivation * y * z


def calculation(eps, Et, Einit, dc):
    A = dc[0]
    E1 = None
    E0 = Einit
    x = 0.0
    y = 0.0
    a = {'x': x, 'y': y, 'e': E0}
    res = [a]
    gamma = random.random()
    while (gamma <= 0.001) | (1.0 - gamma <= 0.001):
        gamma = random.random()
    mean = math.sqrt(float(dc[1]))
    length = next_normal_distributed_value(mean, mean / 3.5)
    cos_theta = 1.0 - 2.0 * gamma
    cos_psi = (A * cos_theta + 1.0) / math.sqrt(A * A + 2.0 * A * cos_theta + 1.0)
    E1 = (E0 * ((1.0 + eps) + ((1.0 - eps) * cos_theta))) / 2.0
    E0 = E1
    vert = math.sqrt(1 - cos_psi * cos_psi)
    x = x + length * cos_psi
    y = y + length * vert if math.floor(random.random() * 1000) % 2 else y - length * vert
    a = {'x': x, 'y': y, 'e': E0}
    res.append(a)
    while E1 - Et > 0.0001:
        gamma = random.random()
        while (gamma <= 0.001) | (1.0 - gamma <= 0.001):
            gamma = random.random()
        mean = math.sqrt(dc[1])
        length = next_normal_distributed_value(mean, mean / 3.5)
        cos_theta = 1.0 - 2.0 * gamma
        cos_psi = (A * cos_theta + 1.0) / math.sqrt(A * A + 2.0 * A * cos_theta + 1.0)
        E1 = (E0 * ((1.0 + eps) + ((1.0 - eps) * cos_theta))) / 2.0
        E0 = E1
        vert = math.sqrt(1 - cos_psi * cos_psi)
        x = x + length * cos_psi
        y = y + length * vert if math.floor(random.random() * 1000) % 2 else y - length * vert
        a = {'x': x, 'y': y, 'e': E0}
        res.append(a)
    res.pop()
    return res


def avrg(res):
    arr = []
    for e in res:
        if res.index(e) > 0:
            p = res[res.index(e) - 1]
            arr.append(math.sqrt((e.get('x') - p.get('x')) ** 2 + (e.get('y') - p.get('y')) ** 2))
    length = reduce(lambda pr, c: pr + c, arr) / len(arr)
    return length


def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])


def main():
    # lines = read_in()
    lines = {
        'matter': '2',
        'terminal': '0.025',
        'initial': '2',
        'amount': '100000'
    }
    dc = DeceleratorConstants[int(lines.get('matter'))]
    Et = float(lines.get('terminal'))
    A = dc[0]
    a = (A - 1.0) / (A + 1.0)
    eps = a ** 2
    Einit = float(lines.get('initial')) * 1e6
    amount = int(lines.get('amount'))

    results = []
    averages = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
        for calc_result in executor.map(calculation,
                                        [eps] * amount, [Et] * amount, [Einit] * amount, [dc] * amount):
            results.append(calc_result)

        trace = results[0]
        res = {'trace': trace}
        eDec = (Einit / Et) / len(results)
        logEDec = math.log(Einit / Et) / len(results)
        avr = {'eDec': eDec, 'logEDec': logEDec}

        for avg_result in executor.map(avrg, results):
            averages.append(avg_result)

    path = reduce(lambda p, c: p + c, averages) / len(averages)
    neutron_age = path ** 2 / 6
    avr.update({'path': path, 'neutron_age': neutron_age})
    res.update({'avrg': avr})
    print(json.dumps(res))


if __name__ == '__main__':
    main()
